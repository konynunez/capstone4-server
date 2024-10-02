require("dotenv").config();

// Import Express and Middleware
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Import Supabase Instance
import supabase from "../supabaseInstance";

//import CORS
import cors from "cors";

//Import Axios
const axios = require("axios");

// Import Route Handlers

// Create an Express application
const app = express();

// Define the port from environment or default to 3000
const PORT = process.env.PORT;

//define our Middleware
// Define CORS Options
const corsOptions = {
  origin: process.env.CAPSTONE4_SERVER || "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  optionsSuccessStatus: 200,
};

// Middleware to handle CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());

// Home Route
app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Welcome our server" });
});

// Error Handling Middleware
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).json({
      error: "Something broke!",
      errorStack: error.stack,
      errorMessage: error.message,
    });
  }
);

// 404 Resource Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

// Start the Server
const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

// Export the app for testing
module.exports = app;
