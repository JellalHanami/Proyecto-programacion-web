const jwt = require('jsonwebtoken'); // Autenticación (Generar tokens)
const bcrypt = require('bcryptjs'); // Encriptación de contraseñas
const dotenv = require('dotenv'); // Variables de entorno
const User = require('../models/user.model'); // Modelo de usuario
const RolePermission = require('../models/rolePermission.model'); // Modelos de permisos y roles

dotenv.config(); // Cargar las variables de entorno

const SECRET_KEY = process.env.JWT_SECRET; // Obtener la clave secreta desde las variables de entorno

// Servicio de autenticación
exports.loginUser = async (email, password) => {
    try {
        // Verificar si el usuario existe en la base de datos
        const user = await User.findOne({ where: { email } });
        // Mensaje de error si el usuario no se encuentra
        if (!user) {
            throw new Error('El usuario no existe');
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // Si las validaciones son correctas:
        // 1. Consultar los permisos del rol
        const rolePermissions = await RolePermission.findAll({
            where: { rol_id: user.rol_id }, // Obtener el rol del usuario
            attributes: ['permiso_id'] // Obtener el id del permiso
        });

        const permisos = rolePermissions.map(rp => rp.permiso_id); // Obtener los ids de los permisos

        // 2. Generar un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, rol_id: user.rol_id, permisos}, // Información que almacena el token
            SECRET_KEY,
            { expiresIn: '1h' } // Tiempo de expiración del token
        );

        return token;

    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};