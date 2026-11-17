import express from "express";
import chalk from "chalk";
import "dotenv/config";
import { mongodbConnect, mongodbDisconnect } from "./src/configs/mongoDatabase.js";
import { usersRouter } from "./src/routes/private/usersRoutes.js";
import { postgresConnect, postgresDisconnect } from "./src/configs/postgresDatabase.js";

const app = express();
const port = process.env.HTTP_PORT;

app.use(express.json());

// Users routes
app.use(usersRouter)

// Database conection
// mongodbConnect();
postgresConnect();

// Server port
try {
  app.listen(port, () => {
    console.log(`Server running! Port: ${chalk.green(port)}`);
  });
} catch (error) {
  console.error(chalk.red("Server could not start!"), error);
}

process.on('SIGINT', async () => {
  await postgresDisconnect();
  process.exit(0);
})

process.on('SIGTERM', async () => {
  await postgresDisconnect();
  process.exit(0);
})
