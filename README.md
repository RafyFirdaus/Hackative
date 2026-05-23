# 🩺 Hana Health AI - Asisten Kesehatan Pintar (AI Health Assistant)

Selamat datang di repository **Hana Health AI**! Project ini adalah aplikasi *full-stack* asisten kesehatan pintar berbasis AI yang dirancang untuk menganalisis keluhan kesehatan pengguna, memberikan edukasi medis dasar, serta memberikan saran penanganan awal yang aman dan terpercaya.

Aplikasi ini menggunakan **FastAPI** di sisi backend yang ditenagai oleh **Google Gemini 2.5 Flash** (via SDK `google-genai` terbaru), dan antarmuka premium berbasis **React (TypeScript) + Vite** dengan desain *Glassmorphism* modern.

---

## 🌟 Fitur Utama

### 🧠 Backend (Smart & Safe AI Engine)
* **Analisis Gejala (Triage)**: Menganalisis keluhan kesehatan secara suportif dan memberikan perkiraan diagnosis awal (*differential diagnosis*) yang logis.
* **Context-Aware Session**: Sistem memori berbasis *Session ID* (in-memory) yang mengingat hingga 5 percakapan terakhir untuk interaksi yang kontekstual.
* **Safety & Guardrails**:
  * **Mandatory Medical Disclaimer**: Menyertakan catatan medis standar di setiap akhir penjelasan.
  * **Emergency Detection**: Secara otomatis menghentikan analisis jika mendeteksi kondisi gawat darurat (seperti sesak napas berat, nyeri dada) dan memberikan peringatan keras untuk menghubungi IGD/Ambulans (118/119).
  * **Defleksi Topik**: Menolak menjawab pertanyaan di luar konteks medis, kesehatan, atau biologi manusia.
  * **Pembatasan Resep**: Tidak memperbolehkan rekomendasi obat keras (antibiotik/obat etikal), hanya menyarankan obat bebas (OTC/Over-The-Counter).

### 🎨 Frontend (Premium & Responsive UI)
* **Glassmorphism Design**: Antarmuka modern yang futuristik, bersih, menggunakan efek *backdrop filter*, gradasi warna yang halus, dan bayangan premium.
* **Real-time Feedback**: Dilengkapi indikator ketik (*typing indicator*) animasi bounce yang natural saat AI sedang berpikir.
* **Tombol Sugesti**: Tombol pertanyaan bawaan untuk membantu pengguna memulai interaksi dengan cepat.
* **Auto-Scroll Pintar**: Layar obrolan otomatis bergeser ke bawah saat ada pesan baru.
* **Fully Responsive**: Didesain secara optimal untuk kenyamanan akses melalui perangkat Desktop maupun Mobile.

---

## 🛠️ Stack Teknologi

### 🐍 Backend
* **Python 3.10+**
* **FastAPI**: Framework web berkinerja tinggi untuk membangun API.
* **Google GenAI SDK**: Menggunakan model terbaru `gemini-2.5-flash` untuk pemrosesan teks yang cepat dan cerdas.
* **Uvicorn**: Server ASGI berkecepatan tinggi untuk menjalankan FastAPI.
* **Pydantic**: Validasi data request dan response.

### ⚛️ Frontend
* **React 19**
* **Vite**: Build tool super cepat untuk pengembangan frontend.
* **TypeScript**: Menjamin keandalan kode dengan static typing.
* **Custom Vanilla CSS**: Kontrol penuh atas styling bertema glassmorphism dan variabel CSS yang rapi.

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js v18+](https://nodejs.org/)

---

### 2. Setup Backend (FastAPI)

1. **Masuk ke direktori utama** dan buat virtual environment:
   ```bash
   python -m venv venv
   ```

2. **Aktifkan virtual environment**:
   * **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **Windows (Git Bash / CMD)**:
     ```bash
     source venv/Scripts/activate
     ```
   * **Linux/macOS**:
     ```bash
     source venv/bin/activate
     ```

3. **Instal dependensi Python**:
   ```bash
   pip install fastapi uvicorn google-genai pydantic python-dotenv httpx
   ```

4. **Konfigurasi Environment Variable (`.env`)**:
   Buat file bernama `.env` di direktori utama, lalu masukkan API Key Gemini Anda:
   ```env
   GEMINI_API_KEY=isi_dengan_api_key_gemini_anda_di_sini
   ```
   > ⚠️ **PENTING**: Pastikan `.env` terdaftar di `.gitignore` agar tidak ter-push ke repository publik!

5. **Jalankan Server Backend**:
   ```bash
   python main.py
   ```
   Server backend akan aktif di: `http://localhost:8000`. Anda bisa mengakses dokumentasi API interaktif Swagger di `http://localhost:8000/docs`.

---

### 3. Setup Frontend (React + Vite)

1. **Buka terminal baru** di direktori utama.
2. **Instal dependensi npm**:
   ```bash
   npm install
   ```
3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Aplikasi frontend dapat diakses melalui browser di: `http://localhost:5173`.

---

## 📁 Struktur Direktori

```text
Hackativ/
├── main.py              # Backend API server (FastAPI + Gemini)
├── .env                 # Environment variables (Berisi GEMINI_API_KEY - JANGAN DI-PUSH!)
├── .gitignore           # Daftar file/folder yang diabaikan oleh Git
├── package.json         # Konfigurasi dependensi dan script Node.js/Vite
├── index.html           # Entry point HTML utama untuk React
├── vite.config.ts       # Konfigurasi build tool Vite
├── src/                 # Source code frontend
│   ├── App.tsx          # Root component utama & state handler
│   ├── main.tsx         # Entry point React DOM
│   ├── index.css        # Global design tokens (variabel CSS, animasi, scrollbar)
│   └── components/      # UI Components
│       ├── ChatWindow.tsx   # Area penampung balon chat & empty state
│       ├── ChatBubble.tsx   # Balon percakapan (User & AI)
│       └── ChatInput.tsx    # Kolom input teks & tombol kirim
└── README.md            # Dokumentasi project
```

---

## 🔒 Lisensi & Keamanan
Aplikasi ini ditujukan untuk tujuan edukasi, demonstrasi asisten kesehatan berbasis AI, dan *triage* gejala kesehatan dasar. Setiap data kredensial API harus selalu dirahasiakan dan disimpan di file `.env` lokal Anda masing-masing.

⚕️ **Hana Health AI** merupakan asisten virtual informasi kesehatan, bukan pengganti diagnosis medis resmi oleh dokter profesional.
