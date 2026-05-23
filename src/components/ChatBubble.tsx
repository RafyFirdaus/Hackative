interface ChatBubbleProps {
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

function ChatBubble({ text, sender, timestamp }: ChatBubbleProps) {
  const isUser = sender === "user";

  const timeString = timestamp.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="animate-fade-in-up"
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        alignItems: "flex-end",
        gap: "10px",
        marginBottom: "16px",
      }}
    >
      {/* AI Avatar */}
      {!isUser && (
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
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)",
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
      )}

      <div style={{ maxWidth: "75%" }}>
        {/* Bubble */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: isUser
              ? "var(--radius-lg) var(--radius-lg) 6px var(--radius-lg)"
              : "var(--radius-lg) var(--radius-lg) var(--radius-lg) 6px",
            background: isUser
              ? "var(--user-bubble)"
              : "var(--ai-bubble)",
            border: isUser ? "none" : "1px solid var(--border-glass)",
            color: isUser ? "#ffffff" : "var(--text-primary)",
            fontSize: "14px",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            boxShadow: isUser
              ? "0 2px 12px rgba(59, 130, 246, 0.25)"
              : "none",
          }}
        >
          {text}
        </div>

        {/* Timestamp */}
        <div
          style={{
            marginTop: "4px",
            fontSize: "11px",
            color: "var(--text-muted)",
            textAlign: isUser ? "right" : "left",
            paddingLeft: isUser ? 0 : "4px",
            paddingRight: isUser ? "4px" : 0,
          }}
        >
          {timeString}
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
