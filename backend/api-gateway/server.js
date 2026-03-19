require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/users', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/orders', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/inventory', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
app.use('/payments', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));
app.use('/notifications', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));
app.use('/analytics', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3007', changeOrigin: true }));
app.use('/billing', authenticateToken, createProxyMiddleware({ target: 'http://localhost:3008', changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});