import express from "express";
import "dotenv/config";
import { mongodbConnect } from "./src/configs/database.js";
import { usersRouter } from "./src/routes/private/usersRoutes.js";

const app = express();
const port = process.env.HTTP_PORT;

app.use(express.json());

// Users routes
app.use(usersRouter)

// Database conection
mongodbConnect();

// Server port
app.listen(port, () => {
  console.log(`Server running! Port: ${port}`);
});
