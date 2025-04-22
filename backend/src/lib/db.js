import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const con=await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB",con.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
