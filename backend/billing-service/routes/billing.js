const express = require('express');
const billingController = require('../controllers/billingController');

const router = express.Router();

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rucEmisor
 *               - razonSocialEmisor
 *               - identificacionReceptor
 *               - tipoIdentificacion
 *               - razonSocialReceptor
 *               - items
 *             properties:
 *               rucEmisor:
 *                 type: string
 *               razonSocialEmisor:
 *                 type: string
 *               direccionEmisor:
 *                 type: string
 *               identificacionReceptor:
 *                 type: string
 *               tipoIdentificacion:
 *                 type: string
 *                 enum: [04, 05, 06, 07, 08]
 *               razonSocialReceptor:
 *                 type: string
 *               direccionReceptor:
 *                 type: string
 *               emailReceptor:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     codigo:
 *                       type: string
 *                     descripcion:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *                     precioUnitario:
 *                       type: number
 *                     descuento:
 *                       type: number
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post('/invoices', billingController.createInvoice);

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get('/invoices', billingController.getAllInvoices);

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Invoice data
 */
router.get('/invoices/:id', billingController.getInvoiceById);

/**
 * @swagger
 * /invoices/{id}/send:
 *   post:
 *     summary: Send invoice to SRI
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Invoice sent to SRI
 */
router.post('/invoices/:id/send', billingController.sendInvoiceToSRI);

/**
 * @swagger
 * /invoices/{id}/xml:
 *   get:
 *     summary: Get invoice XML
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Invoice XML
 */
router.get('/invoices/:id/xml', billingController.getInvoiceXML);

module.exports = router;