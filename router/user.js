import {Router} from 'express';
import {UserController} from '../controller/user.js';
import authToken from '../middleware/authToken.js';

const userRoutes = Router();

// Ruta para crear un nuevo usuario
userRoutes.post('/register', UserController.createUser);

// Ruta para login de un usuario
userRoutes.post('/login', UserController.loginUser);

// Ruta para reset password
userRoutes.post('/reset-password', UserController.resetPassword)


userRoutes.get('/', authToken,  UserController.getAllUsers);
userRoutes.get('/:id', authToken, UserController.getUserById);
userRoutes.put('/:id', authToken, UserController.updateUser);
userRoutes.delete('/:id', authToken, UserController.deleteUser);

export default userRoutes;
