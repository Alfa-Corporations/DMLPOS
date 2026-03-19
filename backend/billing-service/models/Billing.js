const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  claveAcceso: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  numeroFactura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaEmision: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Emisor
  rucEmisor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razonSocialEmisor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccionEmisor: {
    type: DataTypes.TEXT,
  },
  // Receptor
  identificacionReceptor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoIdentificacion: {
    type: DataTypes.ENUM('04', '05', '06', '07', '08'), // RUC, CEDULA, etc.
    allowNull: false,
  },
  razonSocialReceptor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccionReceptor: {
    type: DataTypes.TEXT,
  },
  emailReceptor: {
    type: DataTypes.STRING,
  },
  // Detalles
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  iva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'sent', 'authorized', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

const InvoiceItem = sequelize.define('InvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  precioTotalSinImpuesto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  iva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
});

Invoice.hasMany(InvoiceItem, { foreignKey: 'invoiceId' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoiceId' });

module.exports = { Invoice, InvoiceItem };