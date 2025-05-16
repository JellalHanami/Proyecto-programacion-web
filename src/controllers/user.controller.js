const userService = require('../services/user.service'); // Servicio de usuario

// Creación de usuarios
exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body; // Extraer los atributos del cuerpo de la solicitud

        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id); // Llamar al servicio de usuario
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los usuarios
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id; // Extraer el ID del administrador desde el token
        const { email } = req.query; // Extraer el correo del parámetro de consulta
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email); // Llamar al servicio de usuario

        res.status(200).json({ message: 'Usuarios obtenidos con éxito', users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener usuarios por rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id); // Llamar al servicio de usuario
        res.status(200).json({ message: 'Usuarios obtenidos con éxito', users });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios: ', err });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params; // Extraer el ID de los demás parámetros
    const { nombre, email, rol_id, administrador_id } = req.body; // Extraer los atributos del cuerpo de la solicitud
    const admin_from_token = req.user.id; // Extraer el ID del administrador desde el token

    try {
        // Llamar al servicio de usuario
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({ message: 'Usuario actualizado con éxito', user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Extraer el ID de los demás parámetros
    const admin_from_token = req.user.id; // Extraer el ID del administrador desde el token
    
    try {
        // Llamar al servicio de usuario
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}