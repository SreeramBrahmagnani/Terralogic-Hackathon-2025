import React, { useEffect, useRef, useState } from "react";
import "../styles/dashboard.css";

export default function Queries() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      who: "bot",
      text: "Hello 👋! I'm your AI assistant. Ask me anything related to productivity.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), who: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // show a temporary "typing..." indicator
    const typingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: typingId, who: "bot", text: "⏳ Thinking..." },
    ]);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      // Remove typing message and add final bot response
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== typingId)
          .concat({
            id: Date.now() + 2,
            who: "bot",
            text:
              data?.final_response ||
              "⚠️ Sorry, I couldn't process your request.",
          })
      );
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== typingId)
          .concat({
            id: Date.now() + 3,
            who: "bot",
            text: "❌ Server error: unable to reach backend.",
          })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Queries</h2>
        <p>
          Ask your AI assistant anything related to team tasks or productivity.
        </p>
      </div>

      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-msg ${msg.who}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-bar">
        <input
          type="text"
          placeholder="Type your query..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
