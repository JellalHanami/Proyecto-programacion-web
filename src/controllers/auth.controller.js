const authService = require('../services/auth.service'); // Importación del servicio de autenticación

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body; // Obtener los datos del cuerpo de la solicitud

    try {
        const token = await authService.loginUser(email, password); // Llamar al servicio de autenticación
        res.status(200).json({message: 'Inicio de sesión exitoso', token}); // Enviar el token en la respuesta y el estado HTTP 200
    } catch (err) {
        res.status(400).json({message: err.message}); // Enviar el estado HTTP 400 si la solicitud falla
    }
};