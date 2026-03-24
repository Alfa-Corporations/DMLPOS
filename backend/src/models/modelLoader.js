/**
 * Model Loader - Sistema centralizado y escalable para acceder a modelos
 * 
 * Uso:
 * const { User, Role } = require('./modelLoader');
 * 
 * Los modelos se cargan automáticamente desde db.models después de inicialización
 */

const modelCache = {};

const modelLoader = new Proxy(
  {},
  {
    get: (target, modelName) => {
      // Si ya está en cache, retornarlo
      if (modelCache[modelName]) {
        return modelCache[modelName];
      }

      // Cargar desde db.models
      try {
        const { db } = require('./index');

        if (!db || !db.models) {
          throw new Error('Database not initialized. Ensure initModels() was called.');
        }

        const model = db.models[modelName];

        if (!model) {
          throw new Error(
            `Model "${modelName}" not found in initialized models. ` +
            `Available models: ${Object.keys(db.models).join(', ')}`
          );
        }

        // Cachear el modelo
        modelCache[modelName] = model;
        return model;
      } catch (error) {
        console.error(
          `Error loading model "${modelName}":`,
          error.message
        );
        throw error;
      }
    }
  }
);

/**
 * Clear cache - útil para testing
 */
function clearModelCache() {
  Object.keys(modelCache).forEach(key => delete modelCache[key]);
}

module.exports = modelLoader;
module.exports.clearModelCache = clearModelCache;
