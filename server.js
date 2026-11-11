import "dotenv/config";
import { mongodbConnect } from "./src/configs/database.js";
import express from "express";
import { usersTable } from "./src/models/users/usersSchema.js";
const app = express();
const port = process.env.HTTP_PORT;

mongodbConnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/catch", async (req, res) => {
  try {
    const users = await usersTable.find();
    res.json(users);

  } catch (error) {
    console.error(error);
  }
});

app.post("/users/registration", async (req, res) => {
  try {
    if (!name || !surename || !email || !password) {
      res.json({ message: "All informations is requird!"}).status(400)
      return
    }

    const newUserInformations = await usersTable.create({
      name: name,
      surename: surename,
      email: email,
      password: password
    })

    res.status(201).json({ message: "User creation was successful!"}, newUserInformations)
  } catch (error) {
    console.error("User creation was unsuccessful!", error)
    res.status(400)
  }
});

app.listen(port, () => {
  console.log(`Server running! Port: ${port}`);
});
