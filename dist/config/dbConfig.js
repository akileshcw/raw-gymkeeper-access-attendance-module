"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connecting to MongoDB...");
    mongoose.set("strictQuery", false); // Disable strict query mode
    mongoose.set("bufferTimeoutMS", 20000); // Set buffer timeout to 20 seconds
    try {
        yield mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
});
module.exports = connectDB;
