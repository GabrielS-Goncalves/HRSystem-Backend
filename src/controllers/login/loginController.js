import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postgresConnector } from "../../configs/postgresDatabase.js";

const jwtSecret = process.env.JWT_SECRET;

export const usersFrontendLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      res.json({ message: "Email and Password is required!"}).status(400);
    }

    const userLoginInfo = await postgresConnector.query("SELECT email, password, isactive FROM system_users WHERE email=$1", email);
    const userPassword = userLoginInfo[0];
    const isMatch = await bcrypt.compare(password, userPassword.password);

    if (!userLoginInfo) {
      res.json({ message: "User not found!"}).status(404);
    }

  } catch (error) {
    
  }
};
