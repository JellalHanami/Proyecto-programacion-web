const User = require('../models/user.model'); // Modelo de usuario
const bcrypt = require('bcryptjs'); // Encriptación

// Crear usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: { email } }); // Buscar el usuario por su correo
        if(userExists) {
            throw new Error('El usuario ya existe');
        }

        // Si la validación es correcta
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña con un límite de 10 caracteres

        // Crear el nuevo usuario
        const newUser = await User.create({ 
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;
    } catch (err) {
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Obtener todos los usuarios por administrador asignado
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
        const whereClause = { administrador_id }; // Definir la clausula WHERE

        // Si se proporciona un correo, agregarlo a la clausula WHERE
        if (email) {
            whereClause.email = email;
        }

        // Obtener los usuarios
        const users = await User.findAll({ 
            where: whereClause,
            attributes: { exclude: ['password'] } 
        });
        return users;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Obtener los usuarios por rol
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        // Obtener los usuarios
        const users = await User.findAll({ where: { rol_id }, attributes: { exclude: ['password'] } });
        return users;
    } catch (err) {
        throw new Error(`Error al obtener los usuairos: ${err.message}`);
    }
};

// Actualizar un usuario por su ID
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPk(id); // Buscar el usuario por su ID
        if(user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado: Este usuario no está bajo su administración.');
        }

        if(!user) {
            throw new Error('El usuario no existe');
        }

        // Si la validación es correcta
        if(email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } }); // Buscar el usuario por su correo
            if(userExists) {
                throw new Error('El usuario ya existe');
            }
        }

        // Actualizar el usuario
        await User.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        return user;
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Eliminar un usuario por su ID
exports.deleteUser = async (id, admin_from_token) => {
    try {
        const user = await User.findByPk(id); // Buscar el usuario por su ID
        if(user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado: Este usuario no está bajo su administración.');
        }

        if(!user) {
            throw new Error('El usuario no existe');
        }

        // Si la validación es correcta, se elimina el usuario
        await user.destroy();

        return { message: 'Usuario eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al intentar eliminar el usuario: ${err.message}`);
    }
};
