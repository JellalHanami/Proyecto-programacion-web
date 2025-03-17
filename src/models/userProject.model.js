const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserProject = sequelize.define('usuarios_proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        unique: true
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'proyectos', key: 'id' },
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = UserProject;