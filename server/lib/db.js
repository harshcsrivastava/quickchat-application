import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
