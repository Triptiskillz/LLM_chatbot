import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState([{ sender: "bot", text: "Hello! I'm you AI docter assistant. How can I help you today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    const updatedMessages = [...message, newMessage];
    setMessage(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/docter-support', {
        question: input
      });
      const data = await response.data;
      if (data.status === 'success') {
        const botMessage = { sender: 'bot', text: data.answer?.text || "I'm sorry, I don't have an answer for that." };
        setMessage((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const errorMessage = { sender: 'bot', text: "Sorry, something went wrong. Please try again later." };
        setMessage((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: "Sorry, something went wrong. Please try again later." };
      setMessage((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .chat-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
          display: flex;
          flex-direction: column;
        }
        .message {
          padding: 8px 12px;
          border-radius: 16px;
          margin: 6px;
          max-width: 80%;
          word-wrap: break-word;
        }
        .message.bot {
          background-color: #e1ffc7;
          align-self: flex-start;
        }
        .message.user {
          background-color: #c7dfff;
          align-self: flex-end;
        }
        .input-container {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        input[type="text"] {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 0.5rem;
        }
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
      
      <div className="chat-container">
        <div>
          {message.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="message bot">Typing...</div>}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            placeholder="Ask your health question..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;