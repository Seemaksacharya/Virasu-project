const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "mySecretKey123";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // ✅ Support both { user: { id } } and { id } structures
    req.user = decoded.user || { id: decoded.id };

    if (!req.user.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Token invalid" });
  }
};

module.exports = authMiddleware;
