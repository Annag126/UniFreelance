// src/components/Chatbot.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { user: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { user: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:4000/api/chatbot", { message: input }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const botResponse = response.data.response;
      setMessages([...messages, userMessage, { user: "bot", text: botResponse }]);
    } catch (error) {
      setMessages([...messages, userMessage, { user: "bot", text: "Sorry, there was an error. Please try again later." }]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.user === "bot" ? "bot" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
