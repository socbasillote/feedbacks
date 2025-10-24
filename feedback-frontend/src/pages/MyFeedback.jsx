import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar';

function MyFeedback() {
    const { user } = useContext(AuthContext);
    const [myFeedback, setMyFeedback] = useState([])
    const token = localStorage.getItem("token");

    useEffect(() => {
        // load feedback on page load
        const fetchFeedback = async () => {
            try {
                const res = await fetch("http://localhost:5000/feedback/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok) setMyFeedback(data);
            } catch (err) {
                console.error("Error fetching feedback:", err);
            }
        };
        fetchFeedback();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // or more human-readable format
    };

    const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this feedback?")) return;

  try {
    const res = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (res.ok) {
      setMyFeedback((prev) => prev.filter((f) => f._id !== id));
      alert("Feedback deleted successfully!");
    } else {
      alert(data.message || "Failed to delete feedback");
    }
  } catch (err) {
    console.error("Error deleting feedback:", err);
  }
};


    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                {user ? (
                    <ul>
                        {myFeedback.length > 0 ? (
                            myFeedback.map((f) => (
                                <li
                                    key={f._id}
                                    style={{
                                        marginBottom: "10px",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <p>{f.message}</p>
                                    <small>
                                        by {f.user?.email || "Anonymous"} • {formatDate(f.createdAt)}
                                    </small>
                                    <br />
                                    <button
                                        onClick={() => handleDelete(f._id)}
                                        style={{
                                            marginTop: "8px",
                                            background: "#e74c3c",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "6px 10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>

                            ))
                        ) : (
                            <p>No feedbacks found.</p>
                        )}
                    </ul>
                ) : (
                    <p>Please log in to leave feedback.</p>
                )}
            </div>
        </div>

    )
}

export default MyFeedback