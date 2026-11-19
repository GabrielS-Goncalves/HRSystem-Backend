import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postgresConnector } from "../../configs/postgresDatabase.js";

const jwtSecret = process.env.JWT_SECRET;

export const usersFrontendLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and Password is required!" });
    } else {
      const userLoginInfo = await postgresConnector.query("SELECT id, email, password, isactive FROM system_users WHERE email=$1", [email]);
      const userCredentials = userLoginInfo.rows[0];

      if (userLoginInfo.rowCount === 0) {
        res.status(404).json({ message: "User not found!"});
      } else {
        if (userCredentials.isactive === false) {
          res.status(401).json({ message: "User was inactive! Access Denied!" });
        } else {
          const isMatch = await bcrypt.compare(password, userCredentials.password);
      
          if (!isMatch) {
            res.status(400).json({ message: "Wrong password!" });
          } else {
            const token = jwt.sign({id: userCredentials.id}, jwtSecret, {expiresIn: "1h"},);
            console.log(token);
            res.status(200).json("OK");
          };
        };
      };
    };
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "email or password are incorrect!" });
  }
};
