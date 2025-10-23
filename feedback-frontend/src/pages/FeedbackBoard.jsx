import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import FeedbackForm from '../components/FeedbackForm';

function FeedbackBoard() {
    const API_BASE = "http://localhost:5000";
    const { token, user} = useContext(AuthContext);
    const [feedbacks, setFeedbacks] = useState([])

    const fetchFeedbacks = async () => {
        const res = await fetch(`${API_BASE}/feedback`);
        const data = await res.json();
        setFeedbacks(data);
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleNewFeedback = (newFeedback) => {
        setFeedbacks([newFeedback, ... feedbacks])
    }
  return (
    <div>
        <h2>Feedback Board</h2>

        {user ? (
            <FeedbackForm token={token} onNewFeedback={handleNewFeedback} />
        ) : (
            <p>Login to post feedback.</p>
        )}

        <ul>
            {feedbacks.map((fb) => (
                <li key={fb._id}>
                    <strong>{fb.user?.email}</strong>: {fb.message}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default FeedbackBoard