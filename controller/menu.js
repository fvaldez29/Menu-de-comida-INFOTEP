import { Menu } from '../models/menu.js';

export class MenuController {
    // Crear un nuevo menú
    static async createMenu(req, res) {
        const { day, elements, userId } = req.body;

        try {
            // Validación: el día, los elementos y el ID de usuario son requeridos
            if (!day || !elements || !userId) {
                return res.status(400).json({ message: "El día, los elementos y el ID de usuario son requeridos." });
            }

            // Verificar que 'elements' sea un arreglo y que no tenga más de 5 elementos
            if (!Array.isArray(elements)) {
                return res.status(400).json({ message: "Los elementos deben ser un arreglo." });
            }
            if (elements.length > 5) {
                return res.status(400).json({ message: "El número máximo de elementos es 5." });
            }

            // Crear el nuevo menú
            const newMenu = new Menu({ day, elements, userId });

            // Guardar el menú
            await newMenu.save();
            res.status(201).json({ message: 'Menú creado exitosamente', menu: newMenu });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hubo un error al crear el menú.", error: error.message });
        }
    }

    // Obtener un menú por día y usuario
    static async getMenu(req, res) {
        const { userId, day } = req.params;

        try {
            const menu = await Menu.findOne({ userId, day });

            if (!menu) {
                return res.status(404).json({ message: "No se encontró un menú para ese día." });
            }

            res.status(200).json({ menu });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hubo un error al obtener el menú.", error: error.message });
        }
    }

    // Obtener todos los menús de un usuario
    static async getMenusByUser(req, res) {
        const { userId } = req.params;

        try {
            const menus = await Menu.find({ userId });

            if (menus.length === 0) {
                return res.status(404).json({ message: "No se encontraron menús para este usuario." });
            }

            res.status(200).json({ menus });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hubo un error al obtener los menús.", error: error.message });
        }
    }

    // Actualizar un menú por día y usuario
    static async updateMenu(req, res) {
        const { userId, day } = req.params;
        const { elements } = req.body;

        try {
            // Verificar que 'elements' sea un arreglo y que no tenga más de 5 elementos
            if (!Array.isArray(elements)) {
                return res.status(400).json({ message: "Los elementos deben ser un arreglo." });
            }
            if (elements.length > 5) {
                return res.status(400).json({ message: "El número máximo de elementos es 5." });
            }

            // Actualizar el menú
            const updatedMenu = await Menu.findOneAndUpdate(
                { userId, day },
                { elements },
                { new: true } // Retorna el documento actualizado
            );

            if (!updatedMenu) {
                return res.status(404).json({ message: "No se encontró el menú para ese día." });
            }

            res.status(200).json({ message: "Menú actualizado exitosamente.", menu: updatedMenu });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hubo un error al actualizar el menú.", error: error.message });
        }
    }

    // Eliminar un menú por día y usuario
    static async deleteMenu(req, res) {
        const { userId, day } = req.params;

        try {
            const deletedMenu = await Menu.findOneAndDelete({ userId, day });

            if (!deletedMenu) {
                return res.status(404).json({ message: "No se encontró el menú para ese día." });
            }

            res.status(200).json({ message: "Menú eliminado exitosamente." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hubo un error al eliminar el menú.", error: error.message });
        }
    }
}
