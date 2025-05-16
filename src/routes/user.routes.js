const express = require('express'); // Importar Express
const router = express.Router(); // Crear un enrutador
const userController = require('../controllers/user.controller'); // Importar el controlador
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware'); // Importar middlewares
const ROLES = require('../utils/constants'); // Importar roles
const errorHandler = require('../middlewares/error.middleware'); // Importar middleware de manejo de errores

// Creación de usuarios
router.post('/users/create', authenticateToken, checkRole([ROLES.ADMIN]), userController.createUser);
//router.post('/users/create', userController.createUser); Para crear al primer usuario (admin)

// Actualización de un usuario por su ID
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);

// Obtención de usuarios
router.get('/users/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);

// Eliminación de un usuario
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);

// Obtención de usuarios por rol
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;