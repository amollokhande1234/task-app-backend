// src/config/db.js
import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL); // no options needed
        console.log(`DB Connected Successfully: ${process.env.MONGO_DB_URL}`);
    } catch (e) {
        console.error("Database connection error", e);
        throw e; // optional: rethrow to prevent server from starting
    }
}