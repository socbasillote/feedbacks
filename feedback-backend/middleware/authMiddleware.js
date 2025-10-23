import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    // Attach user info to request object
    req.user = decoded;

    next(); // ✅ move to next middleware or route handler
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};
