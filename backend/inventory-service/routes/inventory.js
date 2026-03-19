const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: integer
 *               minStock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/products', inventoryController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', inventoryController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product data
 */
router.get('/products/:id', inventoryController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: integer
 *               minStock:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put('/products/:id', inventoryController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/products/:id', inventoryController.deleteProduct);

/**
 * @swagger
 * /stock-movements:
 *   post:
 *     summary: Create a stock movement
 *     tags: [Stock Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - type
 *               - quantity
 *               - userId
 *             properties:
 *               productId:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: [in, out]
 *               quantity:
 *                 type: integer
 *               reason:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Stock movement created
 */
router.post('/stock-movements', inventoryController.createStockMovement);

/**
 * @swagger
 * /stock-movements:
 *   get:
 *     summary: Get stock movements
 *     tags: [Stock Movements]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of stock movements
 */
router.get('/stock-movements', inventoryController.getStockMovements);

/**
 * @swagger
 * /low-stock:
 *   get:
 *     summary: Get products with low stock
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products with low stock
 */
router.get('/low-stock', inventoryController.getLowStockProducts);

module.exports = router;