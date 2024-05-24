const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(404).json({ error: "Token not found" });
  }
};

module.exports = { verifyToken };
