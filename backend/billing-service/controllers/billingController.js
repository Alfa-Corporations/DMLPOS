const Joi = require('joi');

const billingService = require('../services/billingService');

class BillingController {
  async createInvoice(req, res) {
    try {
      const schema = Joi.object({
        rucEmisor: Joi.string().length(13).required(),
        razonSocialEmisor: Joi.string().required(),
        direccionEmisor: Joi.string(),
        identificacionReceptor: Joi.string().required(),
        tipoIdentificacion: Joi.string().valid('04', '05', '06', '07', '08').required(),
        razonSocialReceptor: Joi.string().required(),
        direccionReceptor: Joi.string(),
        emailReceptor: Joi.string().email(),
        items: Joi.array().items(
          Joi.object({
            codigo: Joi.string(),
            descripcion: Joi.string().required(),
            cantidad: Joi.number().precision(2).required(),
            precioUnitario: Joi.number().precision(2).required(),
            descuento: Joi.number().precision(2).default(0),
          })
        ).min(1).required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const invoice = await billingService.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllInvoices(req, res) {
    try {
      const invoices = await billingService.getAllInvoices();
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInvoiceById(req, res) {
    try {
      const { id } = req.params;
      const invoice = await billingService.getInvoiceById(id);
      res.json(invoice);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async sendInvoiceToSRI(req, res) {
    try {
      const { id } = req.params;
      const result = await billingService.sendInvoiceToSRI(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInvoiceXML(req, res) {
    try {
      const { id } = req.params;
      const xml = await billingService.getInvoiceXML(id);
      res.set('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BillingController();