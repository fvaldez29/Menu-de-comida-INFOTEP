import { Router } from 'express';
import { MenuController } from '../controller/menu.js';

const menuRouter = Router();

menuRouter.post('/menu', MenuController.createMenu); // Crear un nuevo menú
menuRouter.get('/menu/:userId/:day', MenuController.getMenu); // Obtener un menú por día y usuario
menuRouter.get('/menus/:userId', MenuController.getMenusByUser); // Obtener todos los menús de un usuario
menuRouter.put('/menu/:userId/:day', MenuController.updateMenu); // Actualizar un menú por día y usuario
menuRouter.delete('/menu/:userId/:day', MenuController.deleteMenu); // Eliminar un menú por día y usuario

export default menuRouter;
