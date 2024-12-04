import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export class UserController {
   
    static async createUser(req, res) {
        try {
            const { name, lastName, email, cedula, genre, deparment, role, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está registrado.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                lastName,
                email,
                cedula,
                genre,
                deparment,
                role,
                password: hashedPassword
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el usuario.', error: error.message });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Verificar si el usuario existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
            }

            // Verificar si la contraseña es correcta
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
            }

            // Crear el payload para el token
            const payload = {
                id: user._id,
                name: user.name,
                role: user.role
            };

            // Generar el token
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Enviar el token como respuesta
            res.status(200).json({
                message: 'Login exitoso',
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar iniciar sesión.', error: error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario.', error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { name, lastName, email, cedula, genre, deparment, role, password } = req.body;

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            // Encriptar la contraseña si se actualiza
            const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

            user.name = name || user.name;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.cedula = cedula || user.cedula;
            user.genre = genre || user.genre;
            user.deparment = deparment || user.deparment;
            user.role = role || user.role;
            user.password = hashedPassword;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
        }
    }

    // Eliminar un usuario
    static async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.status(200).json({ message: 'Usuario eliminado con éxito.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
        }
    }
}
