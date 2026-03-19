const User = require('../models/User');

class UserService {
  async getAllUsers() {
    return await User.findAll({ attributes: { exclude: ['password'] } });
  }

  async getUserById(id) {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update(userData);
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
    return { message: 'User deleted successfully' };
  }
}

module.exports = new UserService();