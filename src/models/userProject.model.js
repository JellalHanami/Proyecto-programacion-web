const { DataTypes } = require('sequelize'); // Importar sequelize
const sequelize = require('../config/db'); // Importar la configuración de la base de datos
const User = require('./user.model'); // Importar el modelo de usuario
const Project = require('./project.model'); // Importar el modelo de proyecto

// Modelo de asociación de usuarios y proyectos
const UserProject = sequelize.define('usuarios_proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' },
        unique: true
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Project, key: 'id' },
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = UserProject;