const { Sequelize } = require('sequelize'); // Importar Sequelize
const dotenv = require('dotenv'); // Importar las variables del entorno

dotenv.config(); // Cargar las variables del entorno

// Configuración de la información para acceder a la base de datos
const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Para mejorar el rendimiento
    timezone: '-05:00'
});

module.exports = sequelize;