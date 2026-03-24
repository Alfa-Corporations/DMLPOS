
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DIUR ERP API",
            version: "1.0.0",
            description: "Documentación de la API en microservicios para DIUR ERP",
        },
        servers: [
            { url: "http://localhost:8000" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        "./src/**/routes/*.routes.js",
        "./src/**/controllers/*.js",
        "./src/**/models/*.js",
    ],
};

const swaggerSpec = swaggerJSDOC(options);

const swaggerDocs = (app, port) => {
    //documentation route
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Docs on JSON format
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Documentation available at http://localhost:${port}/api/v1/docs`);
};

module.exports = swaggerDocs
