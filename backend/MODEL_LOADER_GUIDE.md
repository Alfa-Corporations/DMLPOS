# Model Loader - Guía de Implementación Escalable

## 🎯 Objetivo

Proporcionar acceso directo y centralizado a todos los modelos Sequelize sin necesidad de getter functions dispersas en cada servicio.

## 🏗️ Estructura

### Sistema Implementado

```
backend/src/
├── models/
│   ├── modelLoader.js  ← Central model access (Proxy con lazy loading)
│   ├── index.js        ← Database initialization
│   └── initModels.js   ← Model factory definitions
│
├── auth-service/services/
│   └── auth.service.js ← Usa: const models = require('../../models/modelLoader')
│
├── user-service/services/
│   └── user.service.js ← Usa: const models = require('../../models/modelLoader')
│
└── [otros-servicios]/services/
    └── *.service.js    ← Mismo patrón
```

## 📝 Cómo Usar

### Antes (❌ Complicado)

```javascript
// auth.service.js - Con getter functions
const { db } = require('../../models');
const getUser = () => db.models.User;
const getRefreshToken = () => db.models.RefreshToken;

class AuthService {
  async login(email, password) {
    const User = getUser(); // ← Extra paso
    const user = await User.findOne({ where: { email } });
  }
}
```

### Ahora (✅ Escalable y Directo)

```javascript
// auth.service.js - Sin getter functions
const models = require('../../models/modelLoader');

class AuthService {
  async login(email, password) {
    const user = await models.User.findOne({ where: { email } }); // ← Directo
  }
}
```

## 🔧 Características del ModelLoader

### 1. **Lazy Loading**

Los modelos se cargan solo cuando se accede a ellos (no en importación)

```javascript
const models = require('../../models/modelLoader');
// models.User aún no cargado aquí

// Solo se carga cuando lo usas:
const user = await models.User.findOne(...);  // ← Se carga aquí
```

### 2. **Cacheo Automático**

Después de primer acceso, el modelo se cachea para mejor rendimiento

```javascript
models.User; // Primera vez: carga desde db.models y cachea
models.User; // Segunda vez: accede desde cache (más rápido)
```

### 3. **Proxy Transparente**

Acceso completamente transparente a cualquier método Sequelize

```javascript
// Todos funcionan directamente sin wrapper
await models.User.findAll();
await models.Order.create({ ... });
await models.Product.findByPk(id);
await models.RefreshToken.update(...);
```

### 4. **Manejo de Errores**

Mensajes claros si algo falla

```javascript
models.NonExistent;
// Error: "Model "NonExistent" not found in initialized models.
//         Available models: User, Role, Order, Product, ..."
```

## 📚 Ejemplo Completo

### Crear Nuevo Servicio

```javascript
// backend/src/inventory-service/services/inventory.service.js

const models = require('../../models/modelLoader');

class InventoryService {
  async createProduct(productData) {
    const product = await models.Product.create(productData);
    return product;
  }

  async getProductById(id) {
    return await models.Product.findByPk(id);
  }

  async updateStock(productId, quantity) {
    const product = await models.Product.findByPk(productId);
    if (!product) throw new Error('Producto no encontrado');

    const newStock = product.stock + quantity;
    return await product.update({ stock: newStock });
  }

  async decrementStock(productId, quantity) {
    return this.updateStock(productId, -quantity);
  }

  async getAllProducts() {
    return await models.Product.findAll();
  }

  async deleteProduct(id) {
    const product = await models.Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');
    await product.destroy();
  }
}

module.exports = new InventoryService();
```

## ✅ Modelos Disponibles

Todos estos están automáticamente accesibles vía `models`:

- `models.User`
- `models.Role`
- `models.Permission`
- `models.Order`
- `models.OrderItem`
- `models.Product`
- `models.Payment`
- `models.Notification`
- `models.Report`
- `models.Invoice`
- `models.RefreshToken`

## 🧪 Testing

Para limpiar cache entre tests:

```javascript
const { clearModelCache } = require('../models/modelLoader');

// En setup
clearModelCache();

// Tus tests
```

## 📋 Implementación por Servicio

| Servicio                | Estado        | Modelos Usados                  |
| ----------------------- | ------------- | ------------------------------- |
| ✅ auth-service         | Completado    | User, RefreshToken              |
| ✅ user-service         | Completado    | User, Role, Permission          |
| ⏳ order-service        | Por completar | Order, OrderItem, Product, User |
| ⏳ inventory-service    | Por completar | Product                         |
| ⏳ payment-service      | Por completar | Payment, Order                  |
| ⏳ notification-service | Por completar | Notification, User              |
| ⏳ report-service       | Por completar | Report, Invoice, Order          |

## 🎁 Ventajas

1. **Menos código**: sin getter functions en cada servicio
2. **Más escalable**: agregar nuevos modelos es automático
3. **Mejor legibilidad**: acceso directo `models.NombreModelo`
4. **Errores claros**: mensajes específicos cuando algo falla
5. **Performance**: cacheo automático
6. **Mantenibilidad**: un único punto de control (modelLoader.js)

## ⚡ Próximos Pasos

1. Aplicar el patrón a los 5 servicios restantes
2. Reemplazar importes antiguos con `const models = require('../../models/modelLoader')`
3. Simplificar lógica de servicios
