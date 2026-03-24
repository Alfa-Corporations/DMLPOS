const { User, Role, Permission, RolePermission } = require('./index');

const initUserModels = (sequelize) => {
  User(sequelize);
  Role(sequelize);
  Permission(sequelize);
  RolePermission(sequelize);

  // Establecer asociaciones
  const models = sequelize.models;
  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

module.exports = initUserModels;