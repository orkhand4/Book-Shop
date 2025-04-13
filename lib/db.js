import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/";

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("Please define the mongoDB URI");
  }
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
};
