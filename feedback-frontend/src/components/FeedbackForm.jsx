import React from 'react'
import { useState } from 'react'

function FeedbackForm({ onNewFeedback }) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !message) {
            setStatus("Please fill in all fields!");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus(" Feedback submitted!");
                setName("");
                setMessage("");
                onNewFeedback(data.feedback);
            } else {
                setStatus("X Failed to send feedback")
            }
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setStatus("X Server error.");
        }
    };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h2>Submit Feedback</h2>
        <input 
            type='text'
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />
        <textarea 
            placeholder='Your message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%"}}
        />
        <button type='submit'>Send</button>
        <p>{status}</p>
    </form>
  )
}

export default FeedbackForm