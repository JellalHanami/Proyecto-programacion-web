const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
    try {
        const {nombre , email, password, rol_id, administrador_id} = req.body;
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({message: 'usuario creado con exito', user: newUser});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};