const db = require('../utils/database');

const userModels = require('../user-service/models');
const authModels = require('../auth-service/models');
const orderModels = require('../order-service/models');
const inventoryModels = require('../inventory-service/models');
const paymentModels = require('../payment-service/models');
const notificationModels = require('../notification-service/models');
const reportModels = require('../report-service/models');

const modelFactories = {
  ...userModels,
  ...authModels,
  ...orderModels,
  ...inventoryModels,
  ...paymentModels,
  ...notificationModels,
  ...reportModels,
};

const initModels = async () => {
  Object.values(modelFactories).forEach((factory) => {
    factory(db);
  });

  const models = db.models;

  Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });

  await db.sync({ force: false, alter: true });
  console.log('All models initialized and DB synchronized');
};

module.exports = {
  db,
  initModels,
};
