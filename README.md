# DMLPOS - Plataforma Administrativa

Sistema de punto de venta moderno y escalable construido con microservicios.

## Estructura del Proyecto

```
DMLPOS/
├── backend/
│   ├── api-gateway/          # API Gateway (puerto 3000)
│   ├── auth-service/         # Servicio de autenticación (puerto 3001)
│   ├── user-service/         # Servicio de usuarios (puerto 3002)
│   ├── order-service/        # Servicio de pedidos (puerto 3003)
│   ├── inventory-service/    # Servicio de inventario (puerto 3004)
│   ├── payment-service/      # Servicio de pagos (puerto 3005)
│   ├── notification-service/ # Servicio de notificaciones (puerto 3006)
│   ├── analytics-service/    # Servicio de analíticas (puerto 3007)
│   ├── billing-service/      # Servicio de facturación (puerto 3008)
│   └── shared/               # Utilidades compartidas
├── frontend/                 # Aplicación React (puerto 3000)
└── docker/                   # Configuración Docker
```

## Inicio Rápido

1. **Instalar dependencias:**

   ```bash
   ./init.sh
   ```

2. **Iniciar servicios:**

   ```bash
   cd backend
   npm start
   ```

3. **Iniciar frontend:**
   ```bash
   cd frontend
   npm start
   ```

## Servicios

- **API Gateway**: Punto de entrada único para todas las APIs
- **Auth Service**: Autenticación JWT con roles RBAC
- **User Service**: Gestión de usuarios y empleados
- **Order Service**: Manejo de pedidos con Socket.io
- **Inventory Service**: Control de stock y productos
- **Payment Service**: Procesamiento de pagos
- **Notification Service**: Notificaciones en tiempo real
- **Analytics Service**: Reportes y estadísticas
- **Billing Service**: Facturación electrónica SRI Ecuador

## Tecnologías

- **Backend**: Node.js, Express, PostgreSQL, Sequelize, Socket.io
- **Frontend**: React, TypeScript, Redux Toolkit, Bootstrap
- **Infraestructura**: Docker, API Gateway

## Documentación

Cada microservicio incluye documentación Swagger en `/api-docs`.

## Roles del Sistema

- Administrador: Acceso completo
- Mesero: Gestión de pedidos
- Cocinero: Actualización de estados de pedidos
- Cajero: Procesamiento de pagos
- Delivery: Gestión de entregas

## PWA

La aplicación incluye soporte PWA con service worker para funcionamiento offline.
