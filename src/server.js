const sequelize = require('./config/db'); // Importar la configuración de la base de datos
const app = require('./app'); // Importar la instancia de Express para manejar solicitudes, definir rutas, middlewares, etc.
const dotenv = require('dotenv'); // Importar las variables del entorno
require('./models/associations'); // Importar las asociaciones

dotenv.config(); // Cargar las variables del entorno

const PORT = process.env.PORT || 3000; // Obtener el puerto desde las variables del entorno

// Verificar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error conectando a la base de datos: ', err));

// Sincronizar la base de datos
sequelize.sync({force: false}).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos: ', err);
});
