const { RefreshToken } = require('./index');

const initAuthModels = (sequelize) => {
  RefreshToken(sequelize);

  // Asociaciones
  const models = sequelize.models;
  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

module.exports = initAuthModels;