import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/feedback")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setFeedbacks(data.data);
                }
            })
            .catch((err) => console.error("Error fetching feedback:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading feedback...</p>;

  return (
    <div>
        <h2>Feedback Board</h2>
        {feedbacks.length === 0 ? (
            <p>No feedback yet.</p>
        ) : (
            feedbacks.map((fb) => (
                <div
                    key={fb.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "8px 0",
                        borderRadius: "8px",
                    }}
                >
                    <strong>{fb.name}</strong>
                    <p>{fb.message}</p>
                </div>
            ))
        )}
    </div>
  )
}

export default FeedbackList