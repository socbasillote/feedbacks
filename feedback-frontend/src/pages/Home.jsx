import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import FeedbackForm from '../components/FeedbackForm';
import Navbar from '../components/Navbar';

function Home() {
    const { user } = useContext(AuthContext);
    const [feedbackList, setFeedbackList] = useState([]);


    const token = localStorage.getItem("token");


    useEffect(() => {
        // load feedback on page load
        const fetchFeedback = async () => {
            try {
                const res = await fetch("http://localhost:5000/feedback");
                const data = await res.json();
                if (res.ok) setFeedbackList(data.feedbacks);
            } catch (err) {
                console.error("Error fetching feedback:", err);
            }
        };
        fetchFeedback();
    }, []);

    const handleNewFeedback = (newFeedback) => {
        setFeedbackList((prev) => Array.isArray(prev) ? [newFeedback, ...prev] : [newFeedback]);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                {user ? (
                    <>
                        <FeedbackForm token={token} onNewFeedback={handleNewFeedback} />
                        <ul>
                            {feedbackList.map((f) => (
                                <li key={f._id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                                    <p>{f.message}</p>
                                    <small>
                                        by {f.user?.email || "Anonymous"} • {formatDate(f.createdAt)}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Please log in to leave feedback.</p>
                )}
            </div>
        </div>
    )
}

export default Home