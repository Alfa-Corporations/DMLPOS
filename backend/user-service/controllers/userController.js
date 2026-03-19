const Joi = require('joi');

const userService = require('../services/userService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        username: Joi.string(),
        email: Joi.string().email(),
        role: Joi.string().valid('admin', 'mesero', 'cocinero', 'cajero', 'delivery'),
        isActive: Joi.boolean(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const user = await userService.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UserController();