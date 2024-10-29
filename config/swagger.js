const schema = require("../swagger/schema.swagger");

const swaggerConfig = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Doumentation for CRUD Book App",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      components: schema.components,
    },
  },
  apis: ["./routes/*.js", "./swagger/*.js"],
};

module.exports = swaggerConfig;
