import { useState, useCallback } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const API_URL = "http://localhost:8000/chat";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        text,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, session_id: sessionId }),
        });

        const data = await res.json();

        const aiMessage: Message = {
          text: data.reply,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);

        if (data.session_id) {
          setSessionId(data.session_id);
        }
      } catch {
        const errorMessage: Message = {
          text: "Maaf, tidak dapat terhubung ke server. Pastikan backend sedang berjalan.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  const handleSuggestionClick = useCallback(
    (text: string) => {
      handleSend(text);
    },
    [handleSend]
  );

  return (
    <div
      style={{
        height: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem", // changed from 16px to adaptive rem
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden", // strictly block page scrolling
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Chat Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          height: "100%", // take up all space available within padding
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden", // this is key to keep scroll inside ChatWindow
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid var(--border-glass-strong)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "var(--shadow-card)",
          position: "relative",
          zIndex: 1,
        }}
        className="animate-fade-in"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--border-glass)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "rgba(255, 255, 255, 0.02)",
          }}
        >
          {/* Company Icon */}
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(59, 130, 246, 0.3)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5Z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              Hana Health AI
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "2px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                Asisten Virtual • Online
              </span>
            </div>
          </div>

          {/* Settings dot menu (decorative) */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-muted)",
              transition: "var(--transition-fast)",
            }}
            aria-label="Menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </header>

        {/* ── Message Area ───────────────────────────────────────────────── */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* ── Input Area ─────────────────────────────────────────────────── */}
        <ChatInput onSend={handleSend} disabled={isLoading} />

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div
          style={{
            padding: "8px 24px",
            textAlign: "center",
            borderTop: "1px solid var(--border-glass)",
            background: "rgba(255, 255, 255, 0.01)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Powered by AI • Hana Health AI © 2026
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
