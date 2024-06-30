import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// http://localhost:5000/api-docs/ - link to documentation

// Define the options for Swagger documentation
const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Slim Mom API", // Title of the API documentation
      version: "1.0.0", // Version of the API
      description: "API documentation for Slim Mom project", // Short description of the API
    },
    servers: [
      {
        url: "http://localhost:5000", // Base URL of the API server
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http", // Specify the type of security scheme
          scheme: "bearer", // Specify the scheme for the security scheme
          bearerFormat: "JWT", // Format of the bearer token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply the security scheme globally
      },
    ],
  },
  apis: ["./docs/*.js"], // Path to the API documentation files
};

// Generate the Swagger specification based on the options
const swaggerSpec = swaggerJSDoc(options);

// Function to set up Swagger documentation in the Express app
const setupSwagger = (app) => {
  // Serve the Swagger UI at the /api-docs endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
