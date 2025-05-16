const jwt = require('jsonwebtoken'); // Autenticación
const dotenv = require('dotenv'); // Variables de entorno
dotenv.config(); // Cargar las variables de entorno

const SECRET_KEY = process.env.JWT_SECRET; // Obtener la clave secreta desde las variables de entorno

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token de la cabecera

    // Mensaje de error si no se proporciona un token
    if(!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }

    // Verificar el token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({ message: 'Token no valido' });
        }

        req.user = user; // Guardar el usuario en la solicitud
        next(); // Continuar con la solicitud
    });
};

const checkRole = (roles) => {
    // Verificar si el rol del usuario coincide con alguno de los roles permitidos
    return (req, res, next) => {
        const { rol_id } = req.user; // Obtener el rol del usuario

        // Mensaje de error si el rol del usuario no se reconoce con los registrados
        if(!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta accion' });
        }

        next(); // Continuar con la solicitud
    };
};

module.exports = { authenticateToken, checkRole };