require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require('http');
const socketIo = require('socket.io');

const sequelize = require('./config/database');
const orderRoutes = require('./routes/orders');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3003;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Order Service API',
    version: '1.0.0',
    description: 'Order management service for DMLPOS',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/orders', orderRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Make io accessible
app.set('io', io);

// Error handling
app.use(errorHandler);

// Database sync
sequelize.sync().then(() => {
  console.log('Database synced');
  server.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});