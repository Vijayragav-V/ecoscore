const jwt = require("jsonwebtoken");

const authHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.decode(token);

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userData.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authHandler;
