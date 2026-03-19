const { Order, OrderItem } = require('../models/Order');

class OrderService {
  async createOrder(orderData) {
    const { tableNumber, items, userId } = orderData;
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const order = await Order.create({ tableNumber, total, userId });
    const orderItems = items.map(item => ({ ...item, orderId: order.id }));
    await OrderItem.bulkCreate(orderItems);
    return await this.getOrderById(order.id);
  }

  async getAllOrders() {
    return await Order.findAll({ include: OrderItem });
  }

  async getOrderById(id) {
    const order = await Order.findByPk(id, { include: OrderItem });
    if (!order) throw new Error('Order not found');
    return order;
  }

  async updateOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    await order.update({ status });
    return order;
  }

  async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    await OrderItem.destroy({ where: { orderId: id } });
    await order.destroy();
    return { message: 'Order deleted successfully' };
  }
}

module.exports = new OrderService();