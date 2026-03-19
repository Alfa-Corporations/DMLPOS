const { Product, StockMovement } = require('../models/Inventory');

class InventoryService {
  async createProduct(productData) {
    const product = await Product.create(productData);
    return product;
  }

  async getAllProducts() {
    return await Product.findAll();
  }

  async getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.update(productData);
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }

  async createStockMovement(movementData) {
    const { productId, type, quantity } = movementData;
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    const movement = await StockMovement.create(movementData);

    // Update stock
    if (type === 'in') {
      product.stock += quantity;
    } else if (type === 'out') {
      if (product.stock < quantity) throw new Error('Insufficient stock');
      product.stock -= quantity;
    }
    await product.save();

    return movement;
  }

  async getStockMovements(productId = null) {
    const where = productId ? { productId } : {};
    return await StockMovement.findAll({ where, include: Product });
  }

  async getLowStockProducts() {
    return await Product.findAll({
      where: {
        stock: {
          [require('sequelize').Op.lte]: require('sequelize').col('minStock')
        }
      }
    });
  }
}

module.exports = new InventoryService();