import { Client, Pool } from "pg";
import chalk from "chalk";
import "dotenv/config";

// Configuration Pool for Aiven PostgresCloud
export const postgresConnector2 = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.POSTGRES_CA,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxLifetimeSeconds: 60,
});

// Configuration Client for Aiven PostgresCloud
export const postgresConnector = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.POSTGRES_CA,
  },
});

export async function postgresConnect() {
  try {
    await postgresConnector.connect();
    console.log(chalk.green("🟢 Database is connected!"))
  } catch (error) {
    console.error(chalk.red("🔴 Database is not connected!"), error);
    process.exit(1);
  }
}

export async function postgresDisconnect() {
  try {
    await postgresConnector.end();
    console.log(chalk.green("🟢 Database connection was closed by system!"));
  } catch (error) {
    console.error(chalk.red("🔴 Error to close connection with Database..."), error);
    process.exit(1);
  }
}
