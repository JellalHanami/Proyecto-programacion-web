const { DataTypes } = require('sequelize'); // Importar Sequelize
const sequelize = require('../config/db'); // Importar la configuración de la base de datos
const User = require('./user.model'); // Importar el modelo de usuario

// Modelo de proyecto
const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    }
}, {
    timestamps: false,
    tableName: 'proyectos',
    // Configuración del hook (se llama automáticamente al crear un proyecto)
    hooks: {
        afterCreate: (project, options) => {
            // Si existe el campo de la fecha, se le resta 5 horas
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Project;