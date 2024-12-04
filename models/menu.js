import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    day: {
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        required: true
    },
    elements: {
        type: [String], 
        validate: [arrayLimit, '{PATH} supera el límite de elementos permitidos.'] 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 10; 
}

export const Menu = mongoose.model("Menu", menuSchema);
