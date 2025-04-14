import mongoose from "mongoose";

// MongoDB URI mühit dəyişəni ilə tənzimlənib
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Crud";

// Bağlantı funksiyası
export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("Please define the MongoDB URI in environment variables");
  }

  try {
    // Əgər MongoDB artıq bağlıdırsa, yeni bağlantı qurmağa ehtiyac yoxdur
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    // Error meydana gəldikdə, tətbiqi dayandırmaq əvəzinə, istənilən uyğun səhv mesajı qaytarmaq
    throw new Error("MongoDB connection failed");
  }
};
