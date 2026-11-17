import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export const usersAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ messagem: "Access denied!"}).status(401);
  } else {
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), jwtSecret);
      if (decoded === true) {
        next();
      } else {
        return res.json({ message: "Invalid token!"}).status(401);
      }
    } catch (error) {
      return res.json({ menssagem: "Invalid token!"}, error).status(401);
    }
  }
}
