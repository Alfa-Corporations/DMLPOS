
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { initModels } = require('./models');
const hendleError = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

initModels()
    .then(() => console.log('Modelos inicializados y base de datos sincronizada'))
    .catch((error) => {
        console.error('Error inicializando modelos:', error);
        process.exit(1);
    });

// Rutas de microservicios
app.use('/api/v1/auth', require('./auth-service/routes/auth.routes'));
app.use('/auth', require('./auth-service/routes/auth.routes')); // Soporte para ruta legacy
app.use('/api/v1/users', require('./user-service/routes/user.routes'));
app.use('/api/v1/orders', require('./order-service/routes/order.routes'));
app.use('/api/v1/inventory', require('./inventory-service/routes/inventory.routes'));
app.use('/api/v1/payments', require('./payment-service/routes/payment.routes'));
app.use('/api/v1/notifications', require('./notification-service/routes/notification.routes'));
app.use('/api/v1/reports', require('./report-service/routes/report.routes'));

app.use(hendleError);

module.exports = app;

// npm i express sequelize pg pg-hstore dotenv jsonwebtoken bcrypt cors swagger-jsdoc swagger-ui-express ------> dependencias básicas
// npm i nodemailer  -------> Dependencias para envio de correo
// npm i multer @aws-sdk/client-s3  ------> Depenendencias para almacenar imagenes en S3 de AWS
// npm i socket.io  ------> Dependencias para los sockets, interaccions en tiempo real

//npm i nodemon morgan -D
