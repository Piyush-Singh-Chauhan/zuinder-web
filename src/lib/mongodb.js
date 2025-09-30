import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connectDB() {
  if (isConnected) {
    return;
  }
  
  try {
    const conn = await mongoose.connect(process.env.MONGODBURL, {
      dbName: process.env.DB_NAME || "contactDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}
