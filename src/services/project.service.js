const { Project, User, UserProject } = require('../models/associations'); // Importar los modelos desde el archivo de asociaciones
const ROLES = require('../utils/constants'); // Importar roles

// Crear un proyecto
exports.createProject = async (nombre, descripcion, fecha_creacion, administrador_id) => {
    try {
        const newProject = await Project.create({
            nombre,
            descripcion,
            fecha_creacion,
            administrador_id
        });

        return newProject;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Obtener todos los proyectos
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            // Cargar las relaciones asociadas (administrador y usuario)
            include: [
                { model: User, as: 'administrador', attributes: ['id', 'nombre'] },
                { model: User, as: 'usuarios', attributes: ['id', 'nombre', 'email'], through: { attributes: [] } }
            ],
        });

        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Obtener un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id, {
            // Cargar las relaciones asociadas
            include: [
                { model: User, as: 'administrador' },
                { model: User, through: UserProject, as: 'usuarios' }
            ]
        });

        if (!project) {
            throw new Error('El proyecto no existe');
        }

        return project; // Si la validación es correcta, se devuelve el proyecto
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Obtener un proyecto por el ID del usuario
exports.getProjectByUserId = async (userId) => {
    try {
        const project = await Project.findOne({
            where: { administrador_id: userId }, // Filtrar por el ID del administrador
            include: [
                { model: User, as: 'administrador' },
                { model: User, through: UserProject, as: 'usuarios' }
            ]
        });

        if (!project) {
            throw new Error('El proyecto no existe');
        }

        return project; // Si la validación es correcta, se devuelve el proyecto
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Actualizar un proyecto
exports.updateProject = async (id, nombre, descripcion, fecha_creacion, administrador_id) => {
    try {
        const project = await Project.findByPk(id);

        if (!project) {
            throw new Error('El proyecto no existe');
        }

        // Si la validación es correcta, se actualiza el proyecto
        await project.update({
            nombre,
            descripcion,
            fecha_creacion,
            administrador_id
        });

        return project;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Eliminar un proyecto por su ID
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);

        if (!project) {
            throw new Error('El proyecto no existe');
        }

        // Si la validación es correcta, se elimina el proyecto
        await project.destroy();

        return true;
    } catch (err) {
        throw new Error(`Error al intentar eliminar el proyecto: ${err.message}`);
    }
};

// Asignar usuarios a un proyecto
exports.assignUsersToProject = async (projectId, userIds) => {
    try {
        // Verificar si el proyecto y los usuarios existen
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('El proyecto no existe');
        }

        const users = await User.findAll({ where: { id: userIds } });
        if (users.length !== userIds.length) {
            throw new Error('Uno o más usuarios no existen');
        }

        // Asignar los usuarios al proyecto
        await project.addUsuarios(users);
        return await Project.findByPk(projectId, {
            include: [
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                },
            ],
        });
    } catch (err) {
        throw new Error(`Error al asignar usuarios al proyecto: ${err.message}`);
    }
};

// Eliminar un usuario de un proyecto
exports.removeUserFromProject = async (projectId, userId) => {
    try {
        // Verificar si el proyecto y el usuario existen
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('El proyecto no existe');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('El usuario no existe');
        }

        await project.removeUsuario(user); // Eliminar el usuario del proyecto

        return true;
    } catch (err) {
        throw new Error(`Error al eliminar usuario del proyecto: ${err.message}`);
    }
};
