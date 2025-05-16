const express = require('express'); // Importar Express
const cors = require('cors'); // Importar CORS
const app = express(); // Crear una instancia de Express

app.use(express.json()); // Habilitar el uso de JSON en las solicitudes
app.use(cors()); // Habilitar CORS

// Importar rutas
const userRoutes = require('./routes/user.routes');
const authRoutes =  require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

// Definir rutas
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', projectRoutes);

module.exports = app;
