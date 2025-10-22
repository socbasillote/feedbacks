import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json()); // allows reading JSON from POST body

// In-memory feedback "database"
let feedbacks = [
    { id: 1, name: "Aspire", message: "This app is awesome!"},
    { id: 2, name: "Luna", message: "Love the simplicity"},
];

// GET / feedback - fetch all feedback
app.get("/feedback", (req, res) => {
    res.status(200).json({ success: true, data: feedbacks });
})

// POST /feedback - add new feedback
app.post("/feedback", (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ success: false, error: "Name and message are required"})
    }

    const newFeedback = {
        id: feedbacks.length + 1,
        name,
        message,
    };

    feedbacks.push(newFeedback);

    res.status(201).json({ success: true, feedback: newFeedback });
});

// Start server
app.listen(PORT, () => {
    console.log(` SErver running on http://localhost:${PORT}`);
});