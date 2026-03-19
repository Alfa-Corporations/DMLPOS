const Joi = require('joi');

const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'mesero', 'cocinero', 'cajero', 'delivery').required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const user = await authService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const result = await authService.login(req.body);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

      const result = await authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();