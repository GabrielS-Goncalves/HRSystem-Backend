import bcrypt from "bcrypt";
import chalk from "chalk";
import "dotenv/config";
import { postgresConnector } from "../../configs/postgresDatabase.js";

// const jwtSecret = process.env.JWT_SECRET;

// Route for search all users
export const searchUsersRoute = async (req, res) => {
  try {
    const users = await postgresConnector.query(`SELECT * FROM system_users`);

    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.json(error).status(400);
  }
};

// Route for search one user
export const searchUniqueUsersRoute = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json("User ID is required!").status(400);
  }

  try {
    const user = await postgresConnector.query("SELECT * FROM system_users WHERE id=$1", [id]);

    res.json(user.rows).status(200);
  } catch (error) {
    console.error(error)
    res.json(error).status(400)
  }
}

// Route for create new users
export const createUserRoute = async (req, res) => {
  const { name, surename, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    if (!name || !surename || !email || !password) {
      res.json({ message: "All informations is requird!" }).status(400);
      return;
    }


    const newUserInformations = await postgresConnector.query(`
      INSERT INTO system_users(name, surename, email, password) 
        VALUES($1, $2, $3, $4) RETURNING *`, [name, surename, email, hashPassword]
    );

      
    res.json({ message: "User creation was successful!" }, newUserInformations.rows[0]).status(201);
  } catch (error) {
    console.error(chalk.red("User creation was unsuccessful!"), error);
    res.status(400);
  }
};

// Route for update users
export const updateUserRoute = async (req, res) => {
  const id = req.params.id;
  const { name, surename, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    if (!id) {
      res.json({ message: "User ID is required!" }).status(400);
    } else {
      
      const userInformations = await postgresConnector.query(`
        UPDATE system_users SET name=$1, surename=$2, email=$3, password=$4 WHERE id=$5 RETURNING *
        `,[name, surename, email, hashPassword, id]);
      
      res.json({ message: "User modifier was successful!" }, userInformations.rows[0]).status(200);
    }

  } catch (error) {
    console.error(chalk.red("User modifier was unsuccessful!"), error);
    res.status(400);
  }
};

// Route for delete users
export const deleteUserRoute = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      res.json({ message: "User ID is required!" }).status(400);
    }
    const userID = await postgresConnector.query("DELETE FROM system_users WHERE id=$1", [id]);
    res.json({ message: "User deletation was successful!" }, userID).status(204);
  } catch (error) {
    console.error(chalk.red("User deletation was unsuccessful!"), error);
    res.status(400);
  }
};
