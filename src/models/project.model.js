const { DataTypes } = require('sequielize');
const sequelize = require('../config/db');

const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryLey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: true },
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    }
}, {
    timestamps: false,
    tableName: 'proyectos',
    hooks: {
        afterCreate: (project, options) => {
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Project;