const express = require("express");
const cors = require("cors");
const { createUserTable, createApiUsageTable } = require("./db/connection");
const apiRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const { ROUTES, BASE } = require("./routes/route");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // Need to change this to the frontend URL
    origin: [
      "https://delightful-liger-1f565f.netlify.app",
      "http://127.0.0.1:5500",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"], // Add OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Add cookie headers
    exposedHeaders: ["Set-Cookie"], // Important for cookie handling
  })
);

// Ensure tables exist
createUserTable();
createApiUsageTable();

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
  },
  apis: ["./routes/*.js"], // Path to API route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(`${BASE}/doc`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(BASE, apiRoutes);

// Start the server
const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
