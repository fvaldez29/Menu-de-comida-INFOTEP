import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'
import nodemailer from 'nodemailer'

export class UserController {

    static async createUser(req, res) {
        try {
            const { name, lastName, email, cedula, teacherId, genre, department, role, password, confirmPassword } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está registrado.' });
            }

            if (password !== confirmPassword) {
                return console.log('Contraseña incorrecta, favor intentar nuevamente')
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                lastName,
                email,
                cedula,
                genre,
                teacherId,
                department,
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
            const { teacherId, password } = req.body;

            const user = await User.findOne({ teacherId });
            if (!user) {
                return res.status(400).json({ message: 'Id del facilitador o contraseña incorrectos.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta.' });
            }

            const payload = {
                id: user._id,
                name: user.name,
                role: user.role
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login exitoso',
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar iniciar sesión.', error: error.message });
        }
    }

    static async resetPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000;
            user.resetToken = resetToken;
            user.resetTokenExpiry = resetTokenExpiry;
            await user.save();


            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
            });

            const resetLink = `http://localhost:8080/reset-password/${resetToken}`;

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Restablecer contraseña - INFOTEP',
                html:
                    `
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Recuperación de Contraseña</title>
                    <style>
                         body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            width: 150px;
            height: auto;
        }
        .content {
            text-align: center;
            margin-bottom: 30px;
        }
        .content h1 {
            font-size: 24px;
            color: #333;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #666;
        }
        .cta-button {
            display: inline-block;
            background-color: #1d72b8;
            color: #ffffff;
            padding: 15px 30px;
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 30px;
        }
        .footer a {
            color: #1d72b8;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
                </head>
                <body>
                    <!-- Email content, replace placeholders with dynamic data -->
                    <div class="container">
                        <div class="header">
                            <img src="https://your-logo-url.com/logo.png" alt="Logo">
                        </div>
                        <div class="content">
                            <h1>¡Recupera tu Contraseña!</h1>
                            <p>Hola ${userName},</p>
                            <p>Hemos recibido una solicitud para recuperar tu contraseña. Si no fuiste tú, ignora este correo.</p>
                            <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                            <a href="${resetLink}" class="cta-button">Recuperar Contraseña</a>
                            <p>Este enlace expirará en 24 horas.</p>
                        </div>
                        <div class="footer">
                            <p>Si no solicitaste este correo, por favor, contacta a nuestro soporte <a href="mailto:support@example.com">aquí</a>.</p>
                            <p>&copy; ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
            </html>
        `
            });

            res.status(200).json({ message: 'Correo enviado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al procesar la solicitud' });
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
            const { name, lastName, email, cedula, genre, department, role, password } = req.body;

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

        
            const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

            user.name = name || user.name;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.cedula = cedula || user.cedula;
            user.genre = genre || user.genre;
            user.department = deparment || user.deparment;
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
