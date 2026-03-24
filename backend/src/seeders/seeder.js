
const db = require("../utils/database");
const initModels = require("../models/initModels");
const models = require("../models/modelLoader");

// Inicializar modelos
(async () => {
    try {
        await initModels();

        // Esperar a que db.models esté disponible
        setTimeout(async () => {
            const Role = models.Role;
            const Permission = models.Permission;
            const User = models.User;

            console.log("🌱 Iniciando seeding de datos...");

            // Sincronizar sin forzar (preserva datos existentes)
            await db.sequelize.sync();

            // 1. Crear Roles
            const roles = [
                { name: 'admin', description: 'Administrador del sistema' },
                { name: 'cliente', description: 'Cliente/Usuario estándar' },
                { name: 'cajero', description: 'Encargado de caja' },
                { name: 'mesero', description: 'Mesero/Camarero' },
                { name: 'cocinero', description: 'Personal de cocina' },
                { name: 'delivery', description: 'Repartidor' }
            ];

            let createdRoles = [];
            for (const role of roles) {
                const [existingRole, created] = await Role.findOrCreate({
                    where: { name: role.name },
                    defaults: role
                });
                createdRoles.push(existingRole);
                if (created) console.log(`✅ Rol creado: ${role.name}`);
            }

            // 2. Crear Permisos
            const permissions = [
                { name: 'view_users', description: 'Ver usuarios' },
                { name: 'create_user', description: 'Crear usuario' },
                { name: 'edit_user', description: 'Editar usuario' },
                { name: 'delete_user', description: 'Eliminar usuario' },
                { name: 'view_orders', description: 'Ver órdenes' },
                { name: 'create_order', description: 'Crear orden' },
                { name: 'edit_order', description: 'Editar orden' },
                { name: 'view_inventory', description: 'Ver inventario' },
                { name: 'manage_inventory', description: 'Gestionar inventario' },
                { name: 'view_payments', description: 'Ver pagos' },
                { name: 'process_payment', description: 'Procesar pago' }
            ];

            let createdPermissions = [];
            for (const permission of permissions) {
                const [existingPermission, created] = await Permission.findOrCreate({
                    where: { name: permission.name },
                    defaults: permission
                });
                createdPermissions.push(existingPermission);
                if (created) console.log(`✅ Permiso creado: ${permission.name}`);
            }

            // 3. Asignar Permisos a Roles
            const adminRole = createdRoles.find(r => r.name === 'admin');
            const clienteRole = createdRoles.find(r => r.name === 'cliente');
            const cajeroRole = createdRoles.find(r => r.name === 'cajero');

            if (adminRole) {
                await adminRole.setPermissions(createdPermissions);
                console.log(`✅ Permisos asignados a role: admin`);
            }

            if (clienteRole) {
                await clienteRole.setPermissions(
                    createdPermissions.filter(p => p.name === 'view_orders' || p.name === 'create_order')
                );
                console.log(`✅ Permisos asignados a role: cliente`);
            }

            // 4. Crear Usuario Admin
            const adminUser = await User.findOrCreate({
                where: { email: 'admin@diur.com' },
                defaults: {
                    name: 'Administrador',
                    email: 'admin@diur.com',
                    password: 'Admin@2026', // En producción: usar hash
                    roleId: adminRole.id,
                    isActive: true
                }
            });
            console.log(`✅ Usuario admin creado/verificado`);

            console.log("🌱 Seeding completado exitosamente!");

        }, 1000);

    } catch (error) {
        console.error("❌ Error en seeding:", error);
    }
})();
