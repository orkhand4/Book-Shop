import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Crud";

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("Please define the MongoDB URI in environment variables");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw new Error("MongoDB connection failed");
  }
};
