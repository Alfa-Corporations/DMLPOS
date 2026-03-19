const Joi = require('joi');

const inventoryService = require('../services/inventoryService');

class InventoryController {
  async createProduct(req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().precision(2).required(),
        category: Joi.string(),
        stock: Joi.number().integer().min(0),
        minStock: Joi.number().integer().min(0),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const product = await inventoryService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await inventoryService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await inventoryService.getProductById(id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number().precision(2),
        category: Joi.string(),
        stock: Joi.number().integer().min(0),
        minStock: Joi.number().integer().min(0),
        isActive: Joi.boolean(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const product = await inventoryService.updateProduct(id, req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await inventoryService.deleteProduct(id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createStockMovement(req, res) {
    try {
      const schema = Joi.object({
        productId: Joi.number().integer().required(),
        type: Joi.string().valid('in', 'out').required(),
        quantity: Joi.number().integer().min(1).required(),
        reason: Joi.string(),
        userId: Joi.number().integer().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const movement = await inventoryService.createStockMovement(req.body);
      res.status(201).json(movement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getStockMovements(req, res) {
    try {
      const { productId } = req.query;
      const movements = await inventoryService.getStockMovements(productId);
      res.json(movements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLowStockProducts(req, res) {
    try {
      const products = await inventoryService.getLowStockProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InventoryController();