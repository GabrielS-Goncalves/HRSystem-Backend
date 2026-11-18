import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postgresConnector } from "../../configs/postgresDatabase.js";

const jwtSecret = process.env.JWT_SECRET;

export const usersFrontendLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await postgresConnector.query("SELECT email, password, isactive FROM system_users WHERE email=$1", email);
    const isMatch = await bcrypt.compare(password, user.rows.password);
  } catch (error) {
    
  }
};
