import os
import uuid
from collections import defaultdict
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from google import genai

load_dotenv()

# ── Gemini Setup ──────────────────────────────────────────────────────────────
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
Kamu adalah Hana, Asisten Kesehatan Pintar berbasis AI.
Tugasmu adalah menganalisis keluhan pengguna, memberikan kemungkinan diagnosis medis, dan memberikan saran penanganan awal berdasarkan sumber medis terpercaya (seperti WHO, Kemenkes, atau literatur medis standar).

IDENTITAS BOT:
- Nama: Hana
- Peran: Asisten Kesehatan Pintar (AI Health Assistant)
- Nada bicara: Empati, analitis, sopan, dan profesional
- Gaya bahasa: Bahasa Indonesia formal yang mudah dipahami
- Sapaan default: "Halo! Saya Hana, Asisten Kesehatan Pintar Anda."

PRINSIP KOMUNIKASI:
- Gunakan kata ganti "Saya".
- Dengarkan keluhan pengguna secara aktif. Jika gejala yang disampaikan kurang spesifik, ajukan 1-2 pertanyaan lanjutan (seperti durasi, lokasi nyeri, atau pemicu) untuk mengerucutkan diagnosis.
- Berikan penjelasan medis menggunakan istilah yang mudah dimengerti awam.
- Selalu bersikap suportif dan tidak menakut-nakuti pengguna.

YANG BISA KAMU LAKUKAN:
1. Menganalisis gejala yang disebutkan dan menyimpulkan beberapa kemungkinan diagnosis awal (differential diagnosis).
2. Memberikan saran penanganan pertama atau perawatan di rumah (home remedies) untuk penyakit ringan.
3. Menyarankan jenis obat bebas (Over-The-Counter/OTC) yang relevan untuk meringankan gejala.
4. Mengedukasi seputar pola makan, gaya hidup sehat, dan pencegahan penyakit.
5. Memberikan informasi atau mengutip pedoman dari sumber otoritatif medis.

BATAS KEMAMPUANMU:
- Kamu BISA memberikan perkiraan diagnosis, TAPI tegaskan bahwa ini hanyalah analisis awal berbasis pola data.
- TIDAK BOLEH meresepkan obat keras (obat etikal/antibiotik) yang butuh resep dokter.
- Jika analisis menunjukkan kondisi berisiko tinggi atau belum membaik setelah saran awal, rekomendasikan spesialisasi dokter yang tepat untuk dikunjungi.

DISCLAIMER WAJIB:
Setiap kali memberikan diagnosis atau saran penanganan, tambahkan catatan keamanan di akhir pesan:
"⚕️ Catatan: Analisis ini diberikan oleh kecerdasan buatan (AI) sebagai informasi awal, bukan pengganti konsultasi medis profesional. Untuk diagnosis mutlak dan pengobatan yang tepat, harap periksakan diri ke dokter."

TOPIK YANG DILARANG:
- Obrolan di luar konteks kesehatan, medis, nutrisi, atau biologi manusia.
Jika pengguna membahas topik lain, jawab dengan:
"Mohon maaf, fokus saya adalah di bidang kesehatan. Apakah ada keluhan medis atau pertanyaan kesehatan yang bisa saya bantu?"

FORMAT RESPONS:
- Terstruktur: Gunakan paragraf pendek dan poin-poin (bullet points) untuk memudahkan pembacaan.
- Lengkap: Sebutkan diagnosis yang mungkin, alasan/pemicunya, saran tindakan, dan kapan harus waspada (red flags).
- Gunakan emoji secukupnya untuk memberi kesan ramah: 🩺 💊 💡 🥗 💧 ⚠️

KONDISI DARURAT:
Jika ada indikasi kegawatdaruratan (sesak napas hebat, nyeri dada menjalar, pendarahan besar, stroke/kelemahan separuh badan, kejang, dll), HENTIKAN analisis detail dan beri peringatan keras:
"🚨 PERINGATAN DARURAT: Gejala yang Anda alami sangat berisiko dan memerlukan penanganan medis segera! Harap SEGERA menuju Instalasi Gawat Darurat (IGD) rumah sakit terdekat atau hubungi layanan ambulans (118/119)."
""".strip()

# ── App Setup ─────────────────────────────────────────────────────────────────
app = FastAPI(title="Chatbot AI - Asisten Kesehatan Pintar")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── In-memory conversation history (max 5 interactions per session) ───────────
conversation_history: dict[str, list[dict]] = defaultdict(list)
MAX_HISTORY = 5





# ── Models ────────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    source: str  # "rasa" or "gemini"





async def query_gemini(message: str, history: list[dict]) -> str:
    """Send message + history to Gemini and return the reply text."""
    # Build conversation context from history
    history_text = ""
    if history:
        history_text = "\n\nRiwayat percakapan sebelumnya:\n"
        for entry in history:
            history_text += f"Pasien: {entry['user']}\nHana: {entry['bot']}\n"

    full_prompt = f"{SYSTEM_PROMPT}\n{history_text}\nPasien: {message}\nHana:"

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
        )
        return response.text.strip()
    except Exception as e:
        return f"Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti. (Error: {str(e)})"


# ── Endpoint ──────────────────────────────────────────────────────────────────
@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    # Generate or reuse session id
    session_id = req.session_id or str(uuid.uuid4())
    history = conversation_history[session_id]

    # Gunakan Gemini sepenuhnya
    reply = await query_gemini(req.message, history)
    source = "gemini"
    print(f"[DEBUG] → Answered by: GEMINI ✨")

    # Save to history (keep last MAX_HISTORY interactions)
    history.append({"user": req.message, "bot": reply})
    if len(history) > MAX_HISTORY:
        conversation_history[session_id] = history[-MAX_HISTORY:]

    return ChatResponse(reply=reply, session_id=session_id, source=source)


@app.get("/")
async def root():
    return {"status": "ok", "message": "Klinik SmartClinic Chatbot API is running."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

