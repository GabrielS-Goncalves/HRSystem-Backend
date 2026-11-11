import mongoose from "mongoose";
import "dotenv/config";

const databaseUri = process.env.DATABASE_URL;

export async function mongodbConnect() {
  try {
    await mongoose.connect(databaseUri);
    console.log("🟢 Database is connected!");
  } catch (error) {
    console.error("🔴 Database is not connected", error.message);
    process.exit(1);
  }
}

export async function mongodbDisconnect() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB connection is closed by system!");
  } catch (error) {
    console.error("Error to close connection with MongoDB...", error.message);
  }
}
