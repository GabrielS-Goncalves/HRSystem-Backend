import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export const usersAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Access denied!" });
  } else {
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), jwtSecret);
      if (decoded === false) {
        res.status(401).json({ message: "Invalid token!" });
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token!" }, error);
    }
  }
}
