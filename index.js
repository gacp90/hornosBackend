//Env
require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Conection DB
const { dbConection } = require('./database/config');

// Crear el servidor express
const app = express();

// CORS
app.use(cors());

// READ BODY
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


// DataBase
dbConection();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// RUTAS
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/hornos', require('./routes/hornos.route'));
app.use('/api/temperaturas', require('./routes/temperaturas.route'));
app.use('/api/termometros', require('./routes/termometro.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/uploads', require('./routes/uploads.route'));

// SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});