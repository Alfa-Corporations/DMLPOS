const models = require('../../models/modelLoader');

class UserService {
  async getAllUsers() {
    return await models.User.findAll({ include: ['role'] });
  }

  async getUserById(id) {
    return await models.User.findByPk(id, { include: ['role'] });
  }

  async createUser(userData) {
    return await models.User.create(userData);
  }

  async updateUser(id, userData) {
    const user = await models.User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');
    return await user.update(userData);
  }

  async deleteUser(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');
    await user.destroy();
  }

  async getRoles() {
    return await models.Role.findAll({ include: ['permissions'] });
  }

  async assignRoleToUser(userId, roleId) {
    const user = await models.User.findByPk(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return await user.update({ roleId });
  }
}

module.exports = new UserService();