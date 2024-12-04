import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Esquema de Usuario
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  // Asegura que el nombre de usuario sea único
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Asegura que el correo electrónico sea único
        match: [/.+\@.+\..+/, 'Por favor, ingrese un correo válido']
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Mínimo 6 caracteres para la contraseña
    },
    role: {
        type: String,
        enum: ['admin', 'teacher'],
        default: 'teacher'  // El valor predeterminado es 'teacher'
    }
});

// Encriptar la contraseña antes de guardarla
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();  // Si la contraseña no ha sido modificada, no hace nada

    try {
        const salt = await bcrypt.genSalt(10);  // Generar un salt con un costo de 10
        this.password = await bcrypt.hash(this.password, salt);  // Encriptar la contraseña
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar la contraseña
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);


