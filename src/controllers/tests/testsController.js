import bcrypt from "bcrypt";
import { postgresConnector } from "../../configs/postgresDatabase.js";

export const testSearchUsersRoute = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await postgresConnector.query("SELECT email, password, isactive FROM system_users WHERE email=$1", [email]);
    
    console.log(user);
    
    const isMatch = await bcrypt.compare(password, user.rows);

    res.json(user.rows);

    if (isMatch === true) {
      console.log("Pass")
    } else {
      console.log("Fail")
    }

  } catch (error) {
    console.error(error);
    res.json(error).status(400);
  }
};
