require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const sequelize = require('./config/database');
const inventoryRoutes = require('./routes/inventory');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3004;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Inventory Service API',
    version: '1.0.0',
    description: 'Inventory management service for DMLPOS',
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
app.use('/inventory', inventoryRoutes);

// Error handling
app.use(errorHandler);

// Database sync
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Inventory Service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});