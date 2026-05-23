import { useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "12px 20px",
        borderTop: "1px solid var(--border-glass)",
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.02)",
      }}
    >
      <textarea
        id="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ketik pesan Anda..."
        rows={1}
        style={{
          flex: 1,
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid var(--border-glass)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          fontSize: "14px",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          lineHeight: 1.5,
          resize: "none",
          outline: "none",
          transition: "var(--transition-fast)",
          minHeight: "44px",
          maxHeight: "120px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)";
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.boxShadow =
            "0 0 0 3px rgba(59,130,246,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-glass)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      <button
        id="send-button"
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Kirim"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "var(--radius-md)",
          border: "none",
          background:
            disabled || !value.trim()
              ? "rgba(255,255,255,0.05)"
              : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color:
            disabled || !value.trim()
              ? "var(--text-muted)"
              : "#ffffff",
          cursor:
            disabled || !value.trim() ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "var(--transition-base)",
          boxShadow:
            disabled || !value.trim()
              ? "none"
              : "0 2px 12px rgba(59, 130, 246, 0.3)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </form>
  );
}

export default ChatInput;
