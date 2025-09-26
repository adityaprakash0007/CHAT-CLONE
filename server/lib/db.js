import mongoose from "mongoose";

// functon to connect mongodb.

export const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database connected"));
       await mongoose.connect(`${process.env.MONGODB_URI}/CHAT-CLONE`)
    } catch (error) {
        console.log(error);
    }
}