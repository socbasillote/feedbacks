import React from 'react'
import { useState } from 'react'

function FeedbackForm({ token, onNewFeedback }) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus(" Feedback submitted!");
                setMessage("");
                onNewFeedback(data);
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