import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    phonenumber: String,
    role: {
    },
    password: {
        type: String,
        required: true
    },
    
});