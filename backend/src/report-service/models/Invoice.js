'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    }
  }

  Invoice.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    issuedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // Campos para SRI Ecuador
    ruc: {
      type: DataTypes.STRING,
    },
    clientName: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'Invoices',
  });

  return Invoice;
};