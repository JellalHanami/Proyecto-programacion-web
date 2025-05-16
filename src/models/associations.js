const User = require('./user.model'); // Modelo de usuario
const Project = require('./project.model'); // Modelo de proyecto
const UserProject = require('./userProject.model'); // Modelo de relación de usuarios y proyectos

// Relaciones muchos a muchos
User.belongsToMany(Project, { through: UserProject, foreignKey: 'usuario_id', as: 'proyectos' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'proyecto_id', as: 'usuarios' });

// Relación de administrador
Project.belongsTo(User, { foreignKey: 'administrador_id', as: 'administrador' });

module.exports = { User, Project, UserProject };