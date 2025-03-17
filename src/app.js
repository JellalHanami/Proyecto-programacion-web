const express = require('express');
const cors = require('cors');
const app = express();

app.use(express);

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/projec.routes');

app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', projectRoutes);

module.exports = app;