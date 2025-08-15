
const jwt = require("jsonwebtoken");
const User = require("./Model/authModel");

const authMiddleware = async (req, res, next) => {
  console.log("==== AUTH MIDDLEWARE TRIGGERED ====");
  console.log("Request Headers:", req.headers);

  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ No Authorization header or invalid format");
    return res.status(401).json({ status: "error", msg: "No token, access denied" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified successfully:", decoded);

    // If token does not have role, fetch from DB
    if (!decoded.role) {
      const user = await User.findById(decoded.id).select("role");
      decoded.role = user.role;
    }

    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(401).json({ status: "error", msg: "Invalid token" });
  }
};







const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: "error", msg: "Access denied. Admin only." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
