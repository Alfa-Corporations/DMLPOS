const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../models/modelLoader');

class AuthService {
  async login(email, password) {
    const user = await models.User.findOne({
      where: { email },
      include: ['role']
    });
    if (!user) throw new Error('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Contraseña incorrecta');

    const token = this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { token, refreshToken, user };
  }

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Si no se especifica roleId, asignar rol de "cliente" por defecto
    let roleId = userData.roleId;
    if (!roleId) {
      const defaultRole = await models.Role.findOne({ where: { name: 'cliente' } });
      if (!defaultRole) {
        throw new Error('Rol de cliente no configurado. Contacte al administrador.');
      }
      roleId = defaultRole.id;
    }

    const user = await models.User.create({
      ...userData,
      password: hashedPassword,
      roleId
    });

    // Retornar el usuario con el rol asociado
    return await models.User.findByPk(user.id, { include: ['role'] });
  }

  generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  async generateRefreshToken(user) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const refreshToken = await models.RefreshToken.create({ token, userId: user.id, expiresAt });
    return refreshToken.token;
  }

  async refreshToken(refreshToken) {
    const tokenDoc = await models.RefreshToken.findOne({ where: { token: refreshToken } });
    if (!tokenDoc || tokenDoc.expiresAt < new Date()) throw new Error('Token inválido');

    const user = await models.User.findByPk(tokenDoc.userId);
    const newToken = this.generateToken(user);
    return { token: newToken };
  }
}

module.exports = new AuthService();