import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postgresConnector } from "../../configs/postgresDatabase.js";

const jwtSecret = process.env.JWT_SECRET;

export const testSearchUsersRoute = async (req, res) => {
  try {

    const { email, password } = req.body;
    const userLogin = await postgresConnector.query("SELECT id, email, password, isactive FROM system_users WHERE email=$1", [email]);
    const userInfo = userLogin.rows[0];
    
    console.log(userLogin.rows);
    
    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (!userLogin) {
      res.status(404).json({ message: "User not found!"});
    }
    if (!isMatch) {
      res.status(400).json({ message: "Wrong password!" });
    } else {
      const token = jwt.sign({id: userLogin.id}, jwtSecret, {expiresIn: "1h"},);
      res.status(400)
    }

    res.json("OK");
  } catch (error) {
    console.error(error);
    res.json(error).status(400);
  }
};
