# 🔧 Inicialización de Base de Datos y Seeding

## 📋 Pasos para Inicializar el Sistema

### 1️⃣ Instalar Dependencias

```bash
cd backend
npm install
```

### 2️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en `backend/` con:

```env
# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=diurpos
DB_PORT=5432

# JWT Secrets
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key

# Environment
NODE_ENV=development
PORT=5000
```

### 3️⃣ Crear Base de Datos (PostgreSQL)

```sql
CREATE DATABASE diurpos;
```

### 4️⃣ Ejecutar Seeder (Crear Roles, Permisos y Admin)

```bash
npm run seeder
```

**Esto creará:**

- ✅ 6 Roles: admin, cliente, cajero, mesero, cocinero, delivery
- ✅ 11 Permisos: CRUD de usuarios, órdenes, inventario, pagos
- ✅ 1 Usuario Admin: `admin@diur.com` / `Admin@2026`

### 5️⃣ Iniciar el Servidor

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

---

## 🗺️ Flujo de Autenticación

### Registro de Usuario

```bash
POST /auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Segura@123"
  // roleId es OPCIONAL - se asigna automáticamente rol "cliente"
}
```

**Respuesta:**

```json
{
  "id": 2,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "roleId": 2,
  "role": {
    "id": 2,
    "name": "cliente",
    "description": "Cliente/Usuario estándar"
  },
  "isActive": true,
  "createdAt": "2026-03-24T...",
  "updatedAt": "2026-03-24T..."
}
```

### Login de Usuario

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "Segura@123"
}
```

**Respuesta:**

```json
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": 2,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": {
      "id": 2,
      "name": "cliente"
    }
  }
}
```

### Refrescar Token

```bash
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

---

## 🔐 Roles y Permisos

### Roles Creados

| Rol          | Descripción               |
| ------------ | ------------------------- |
| **admin**    | Acceso total al sistema   |
| **cliente**  | Ver y crear órdenes       |
| **cajero**   | Gestionar pagos y caja    |
| **mesero**   | Crear y ver órdenes       |
| **cocinero** | Ver y actualizar órdenes  |
| **delivery** | Ver órdenes para entregar |

### Permisos por Rol

| Rol      | Permisos                                    |
| -------- | ------------------------------------------- |
| admin    | Todos                                       |
| cliente  | view_orders, create_order                   |
| cajero   | view_orders, view_payments, process_payment |
| mesero   | view_orders, create_order                   |
| cocinero | view_orders                                 |
| delivery | view_orders                                 |

---

## 🌱 Reiniciar/Limpiar Base de Datos

### Opción 1: Seeder Completo (Preserva datos)

```bash
npm run seeder
# Crea roles/permisos si no existen, sin eliminar usuarios
```

### Opción 2: Limpiar Todo (Destructivo)

Este script aún no existe. Para hacer reset:

```bash
# Eliminado y recrear base de datos
DROP DATABASE diurpos;
CREATE DATABASE diurpos;
npm run seeder
```

---

## 🧪 Pruebas Rápidas

### 1. Registrar Usuario Test

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### 3. Usar Token en Requests

```bash
curl -X GET http://localhost:5000/api/v1/users \
  -H "Authorization: Bearer <TU_TOKEN>"
```

---

## ❌ Solución de Problemas

### Error: "Rol de cliente no configurado"

**Solución:** Ejecutar `npm run seeder` para crear roles

### Error: "Foreign key constraint violation"

**Solución:** Asegurar que `roleId` sea válido o dejar que se asigne automáticamente

### Error: "Database connection refused"

**Solución:**

1. Verificar que PostgreSQL está en ejecución
2. Verificar variables de entorno en `.env`
3. Verificar que la BD existe: `CREATE DATABASE diurpos;`

### Error: "User not found"

**Solución:** Ejecutar seeder para crear usuario admin

---

## 📊 Estructura de Base de Datos

```sql
-- Roles (creado por seeder)
Users.roleId → Roles.id (Foreign Key Required)

-- Permisos
RolePermissions.roleId → Roles.id
RolePermissions.permissionId → Permissions.id

-- Tokens
RefreshTokens.userId → Users.id

-- Órdenes
Orders.userId → Users.id
OrderItems.orderId → Orders.id
OrderItems.productId → Products.id

-- Pagos
Payments.orderId → Orders.id

-- Notificaciones
Notifications.userId → Users.id
```

---

## 🚀 Próximos Pasos

- [ ] Tests unitarios para auth
- [ ] Middleware de validación mejorado
- [ ] Rate limiting en login
- [ ] Recuperación de contraseña
- [ ] Two-factor authentication
- [ ] OAuth2 integration
