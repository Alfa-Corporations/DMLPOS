const { Invoice, InvoiceItem } = require('../models/Billing');
const { v4: uuidv4 } = require('uuid');

class BillingService {
  generateClaveAcceso(fecha, ruc, tipoComprobante, numero, codigoNumerico, tipoEmision) {
    // Simulación de generación de clave de acceso SRI
    const fechaStr = fecha.replace(/-/g, '');
    const tipoComprobanteStr = tipoComprobante.padStart(2, '0');
    const numeroStr = numero.padStart(9, '0');
    const codigoNumericoStr = codigoNumerico.padStart(8, '0');
    const tipoEmisionStr = tipoEmision;

    const clave = fechaStr + tipoComprobanteStr + ruc + '1' + numeroStr + codigoNumericoStr + tipoEmisionStr;
    // En realidad, se calcula con módulo 11
    return clave + '1'; // Simulado
  }

  async createInvoice(invoiceData) {
    const { items, ...invoiceInfo } = invoiceData;

    // Generar clave de acceso
    const fecha = new Date().toISOString().split('T')[0];
    const numeroFactura = `001-001-${Date.now().toString().slice(-9)}`;
    const claveAcceso = this.generateClaveAcceso(fecha, invoiceInfo.rucEmisor, '01', numeroFactura.replace(/-/g, ''), '12345678', '1');

    const subtotal = items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
    const iva = subtotal * 0.12; // 12% IVA Ecuador
    const total = subtotal + iva;

    const invoice = await Invoice.create({
      ...invoiceInfo,
      claveAcceso,
      numeroFactura,
      fechaEmision: new Date(),
      subtotal,
      iva,
      total,
    });

    const invoiceItems = items.map(item => ({
      ...item,
      invoiceId: invoice.id,
      precioTotalSinImpuesto: item.precioUnitario * item.cantidad,
      iva: (item.precioUnitario * item.cantidad) * 0.12,
    }));

    await InvoiceItem.bulkCreate(invoiceItems);

    return await this.getInvoiceById(invoice.id);
  }

  async getAllInvoices() {
    return await Invoice.findAll({ include: InvoiceItem });
  }

  async getInvoiceById(id) {
    const invoice = await Invoice.findByPk(id, { include: InvoiceItem });
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }

  async sendInvoiceToSRI(id) {
    const invoice = await this.getInvoiceById(id);
    if (!invoice) throw new Error('Invoice not found');

    // Simulación de envío al SRI
    // En producción, aquí iría la lógica real de firma digital, envío SOAP, etc.
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay

    // Simular respuesta del SRI
    const sriResponse = {
      estado: 'AUTORIZADO',
      numeroAutorizacion: `123456789-${Date.now()}`,
      fechaAutorizacion: new Date().toISOString(),
      ambiente: 'PRUEBAS',
    };

    await invoice.update({ status: 'authorized' });

    return { invoice, sriResponse };
  }

  async getInvoiceXML(id) {
    const invoice = await this.getInvoiceById(id);
    // Simulación de generación XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<factura id="comprobante" version="1.1.0">
  <infoTributaria>
    <ambiente>1</ambiente>
    <tipoEmision>1</tipoEmision>
    <razonSocial>${invoice.razonSocialEmisor}</razonSocial>
    <ruc>${invoice.rucEmisor}</ruc>
    <claveAcceso>${invoice.claveAcceso}</claveAcceso>
    <codDoc>01</codDoc>
    <estab>001</estab>
    <ptoEmi>001</ptoEmi>
    <secuencial>${invoice.numeroFactura.split('-')[2]}</secuencial>
    <dirMatriz>${invoice.direccionEmisor}</dirMatriz>
  </infoTributaria>
  <!-- Más estructura XML aquí -->
</factura>`;
    return xml;
  }
}

module.exports = new BillingService();