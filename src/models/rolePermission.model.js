const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

// Modelo de asociación de roles y permisos
const RolePermission = sequelize.define('roles_permisos', {
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' },
        unique: true
    },
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'permisos', key: 'id' },
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'roles_permisos',
});

module.exports = RolePermission;