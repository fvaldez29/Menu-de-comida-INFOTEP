import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(400).send({
                success: false,
                message: 'Token no proporcionado, por favor incluya un token en la solicitud.'
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);


        req.body.id = decoded.id;
        
       next();
        
    } catch (error) {
        console.error(error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                success: false,
                message: 'Credenciales inválidas o token expirado.'
            });
        }

        res.status(500).send({
            success: false,
            message: 'Hubo un problema al verificar el token.'
        });
    }
};
