const express = require('express'); // Importar Express
const router = express.Router(); // Crear un enrutador
const projectController = require('../controllers/project.controller'); // Importar el controlador
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware'); // Importar middlewares
const ROLES = require('../utils/constants'); // Importar roles

// Ruta para crear un nuevo proyecto
router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);

// Ruta para actualizar un proyecto
router.put('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);

// Ruta para eliminar un proyecto
router.delete('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);

// Ruta para obtener todos los proyectos
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);

// Ruta para obtener un proyecto por ID
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectById);

// Ruta para obtener los proyectos de un usuario
router.get('/projects/user/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectByUserId);

// Ruta para asociar usuarios a un proyecto
router.post('/projects/:projectId/users', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assignUsersToProject);

// Ruta para eliminar un usuario de un proyecto
router.delete('/projects/:projectId/users/:userId', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);

module.exports = router;