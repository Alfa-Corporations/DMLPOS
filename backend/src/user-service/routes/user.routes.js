const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../../auth-service/middlewares/auth.middleware');
const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(authenticate);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', authorize(['admin']), userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: string
 *               email: string
 *               password: string
 *               roleId: integer
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/', authorize(['admin']), userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: string
 *               email: string
 *               roleId: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado
 */
router.delete('/:id', authorize(['admin']), userController.deleteUser);

/**
 * @swagger
 * /users/roles:
 *   get:
 *     summary: Obtener roles
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/roles', userController.getRoles);

/**
 * @swagger
 * /users/assign-role:
 *   post:
 *     summary: Asignar rol a usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: integer
 *               roleId: integer
 *     responses:
 *       200:
 *         description: Rol asignado
 */
router.post('/assign-role', authorize(['admin']), userController.assignRole);

module.exports = router;