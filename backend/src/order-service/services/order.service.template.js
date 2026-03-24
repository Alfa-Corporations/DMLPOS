/**
 * TEMPLATE - Service Pattern con Model Loader
 * 
 * Reemplaza esto en cada servicio nuevo para acceder a modelos de forma escalable
 */

const models = require('../../models/modelLoader');

class OrderService {
  /**
   * Acceso a modelos:
   * - models.Order
   * - models.OrderItem
   * - models.Product
   * - models.User
   * - etc.
   * 
   * Solo necesitas importar modelLoader y usar models.NombreDelModelo
   * Los modelos se cargan automáticamente al acceder a ellos (lazy loading)
   */

  async createOrder(orderData) {
    // Uso directo sin getter functions
    const order = await models.Order.create(orderData);
    return order;
  }

  async getOrderById(id) {
    // Acceso con include automático
    const order = await models.Order.findByPk(id, {
      include: ['orderItems', 'user']
    });
    return order;
  }

  async updateOrderStatus(id, status) {
    const order = await models.Order.findByPk(id);
    if (!order) throw new Error('Orden no encontrada');
    return await order.update({ status });
  }

  async addOrderItem(orderId, productId, quantity, price) {
    const orderItem = await models.OrderItem.create({
      orderId,
      productId,
      quantity,
      price
    });
    return orderItem;
  }
}

module.exports = new OrderService();

/**
 * VENTAJAS DEL SISTEMA:
 * 
 * ✅ Escalable: funciona para todos los modelos sin cambios
 * ✅ Limpio: un import, acceso directo a cualquier modelo
 * ✅ Lazy Loading: modelos se cargan al acceder, no en importación
 * ✅ Cacheo: modelos se cachean después de primer acceso
 * ✅ Errores: mensajes claros si modelo no existe o db no inicializada
 * ✅ Testing: función clearModelCache() para limpiar entre tests
 * 
 * ESTRUCTURA:
 * const models = require('../../models/modelLoader');
 *                ↓
 * models.NombreModelo.metodo()
 *                ↓
 * Proxy intercepta y carga desde db.models automáticamente
 */
