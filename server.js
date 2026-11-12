import express from "express";
import "dotenv/config";
import { mongodbConnect } from "./src/configs/database.js";
import { catchUsersRoute, createUserRoute, deleteUserRoute, updateUserRoute } from "./src/controllers/users/usersController.js";

const app = express();
const port = process.env.HTTP_PORT;

app.use(express.json());

mongodbConnect();

// Users routes
app.get("/users/catch", catchUsersRoute);
app.post("/users/create", createUserRoute);
app.put("/users/update/:id", updateUserRoute);
app.delete("/users/delete/:id", deleteUserRoute);

// Server port
app.listen(port, () => {
  console.log(`Server running! Port: ${port}`);
});
