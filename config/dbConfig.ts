const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  mongoose.set("strictQuery", false); // Disable strict query mode
  mongoose.set("bufferTimeoutMS", 20000); // Set buffer timeout to 20 seconds
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
