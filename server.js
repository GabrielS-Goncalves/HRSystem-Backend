import express from "express";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";
import { privateRouters } from "./src/routes/private/routes.js";
import { publicRouters } from "./src/routes/public/routes.js";
import { testsRouters } from "./src/routes/tests/routes.js";
import { postgresConnect, postgresDisconnect } from "./src/configs/postgresDatabase.js";

const app = express();
const port = process.env.HTTP_PORT;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credential: true,
}));
// Database conection
postgresConnect();

// Private routes
app.use("/system", privateRouters);

// Public routes
app.use("/app", publicRouters);

// Test routes
app.use("/tests", testsRouters);


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
