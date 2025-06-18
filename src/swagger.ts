import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:4000/",
      }
    ],
    tags: [
      {
        name: "Movies",
      },
      {
        name: "Users",
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});
