import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
}

const SUGGESTIONS = [
  "apa saja yang bisa AI Health Assistant lakukan?",
  "apakah AI Health Assistant bisa menggantikan dokter?",
  "bagaimana cara kerja AI Health Assistant?",
];

function ChatWindow({ messages, isLoading, onSuggestionClick }: ChatWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "20px 24px",
      }}
    >
      {/* Empty State — Welcome Card */}
      {messages.length === 0 && !isLoading && (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="animate-fade-in-up"
            style={{
              textAlign: "center",
              maxWidth: "380px",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "var(--radius-lg)",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.15) 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-light)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              Halo! Saya Hana, Asisten Kesehatan Pintar Anda.
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              Saya dapat membantu menganalisis keluhan Anda dan memberikan saran penanganan awal berdasarkan sumber medis terpercaya.
            </p>

            {/* Suggested Questions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestionClick(s)}
                  style={{
                    padding: "8px 14px",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    color: "var(--accent-light)",
                    background: "rgba(59, 130, 246, 0.08)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "var(--radius-full)",
                    cursor: "pointer",
                    transition: "var(--transition-fast)",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(59, 130, 246, 0.15)";
                    e.currentTarget.style.borderColor =
                      "rgba(59, 130, 246, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(59, 130, 246, 0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(59, 130, 246, 0.2)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          text={msg.text}
          sender={msg.sender}
          timestamp={msg.timestamp}
        />
      ))}

      {/* Typing Indicator */}
      {isLoading && (
        <div
          className="animate-fade-in"
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              background:
                "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
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

          {/* Dots */}
          <div
            style={{
              padding: "14px 20px",
              borderRadius:
                "var(--radius-lg) var(--radius-lg) var(--radius-lg) 6px",
              background: "var(--ai-bubble)",
              border: "1px solid var(--border-glass)",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--accent-light)",
                  opacity: 0.6,
                  animation: `typing-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
