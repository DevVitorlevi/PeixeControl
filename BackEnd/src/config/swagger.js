const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PeixeControl API",
      version: "1.0.0",
      description: "API para gerenciamento de estoque e vendas de peixarias",
    },
    servers: [{ url: "http://localhost:3333", description: "Ambiente local" }],
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
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

module.exports = swaggerJsdoc(options);
