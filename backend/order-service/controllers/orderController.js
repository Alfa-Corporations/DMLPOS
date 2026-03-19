const Joi = require('joi');

const orderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const schema = Joi.object({
        tableNumber: Joi.number().integer().required(),
        items: Joi.array().items(
          Joi.object({
            productId: Joi.number().integer().required(),
            quantity: Joi.number().integer().min(1).required(),
            price: Joi.number().precision(2).required(),
          })
        ).min(1).required(),
        userId: Joi.number().integer().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      res.json(order);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const schema = Joi.object({
        status: Joi.string().valid('pending', 'preparing', 'ready', 'delivered').required(),
      });
      const { error } = schema.validate({ status });
      if (error) return res.status(400).json({ error: error.details[0].message });

      const order = await orderService.updateOrderStatus(id, status);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const result = await orderService.deleteOrder(id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();