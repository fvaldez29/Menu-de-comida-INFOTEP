import {Router} from 'express';
import {UserController} from '../controller/user.js';

const userRoutes = Router();

// Ruta para crear un nuevo usuario
userRoutes.post('/register', UserController.createUser);

// Ruta para login de un usuario
userRoutes.post('/login', UserController.loginUser);

// Otras rutas como obtener usuarios, actualizar y eliminar usuarios
userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);

export default userRoutes;
