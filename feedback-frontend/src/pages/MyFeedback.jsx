import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar';

function MyFeedback() {
    const { user } = useContext(AuthContext);
    const [myFeedback, setMyFeedback] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [editMessage, setEditMessage] = useState("");
    const token = localStorage.getItem("token");

    const Localhost = "http://localhost:5000/feedback"

    useEffect(() => {
        // load feedback on page load
        const fetchFeedback = async () => {
            try {
                const res = await fetch(`${Localhost}/my`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok) setMyFeedback(data);
            } catch (err) {
                console.error("Error fetching feedback:", err);
            }
        };
        fetchFeedback();
    }, [token]);

    const handleEdit = (id, message) => {
        setEditingId(id);
        setEditMessage(message);
    }

    const handleSave = async (id) => {
        try {
            const res = await fetch(`${Localhost}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: editMessage }),
            });

            const updated = await res.json();

            if (res.ok) {
                setMyFeedback((prev) => prev.map((f) => (f._id === id ? updated : f)));
                setEditingId(null);
                setEditMessage("");
            }
        } catch (err) {
            console.error("Error updating feedback:", err);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // or more human-readable format
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            const res = await fetch(`${Localhost}/${id}`, {
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
                                    {editingId === f._id ? (
                                        <>
                                            <textarea 
                                                value={editMessage}
                                                onChange={(e) => setEditMessage(e.target.value)}
                                                style={{ padding: "8px"}}
                                            />
                                            <button onClick={() => handleSave(f._id)}>Save</button>
                                            <button onClick={() => setEditingId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{f.message}</p>
                                            <small>
                                                by {f.user?.email || "Anonymous"} • {formatDate(f.createdAt)}
                                            </small>
                                            <br />
                                            <button onClick={() => handleEdit(f._id, f.message)}>
                                                Edit
                                            </button>
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
                                        </>
                                    )}
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