import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    cedula: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['Masculino', 'Femenino']
    },
    deparment: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['facilitador', 'admin'],
        required: true
    },
    password: {
        type: String,
        required: true
    }


}, { timestamps: true })


export const User = mongoose.model('User', userSchema)