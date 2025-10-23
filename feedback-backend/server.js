import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();
const app = express();


// middleware
app.use(cors());
app.use(express.json()); // allows reading JSON from POST body

// Conntect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connect successfully"))
    .catch((err) => console.error("MongoDB connection err", err))

// Routes
app.use("/auth", authRoutes );
app.use("/feedback", feedbackRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` SErver running on http://localhost:${PORT}`);
});