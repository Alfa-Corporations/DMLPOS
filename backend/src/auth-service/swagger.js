const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description: "API para autenticación y autorización"
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1/auth",
      },
    ],
  },
  apis: [
    "./routes/*.routes.js",
    "./models/*.models.js"
  ],
};

const swaggerSpec = swaggerJSDOC(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/auth/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/auth/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Auth Service Documentation available at http://localhost:${port}/api/v1/auth/docs`);
};

module.exports = swaggerDocs;