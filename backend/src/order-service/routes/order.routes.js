const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
router.get('/', (req, res) => {
  // Lógica para obtener órdenes
  res.json([]);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items: array
 *               total: number
 *     responses:
 *       201:
 *         description: Orden creada
 */
router.post('/', (req, res) => {
  // Lógica para crear orden
  res.status(201).json({ message: 'Order created' });
});

module.exports = router;