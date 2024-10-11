require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import supabase from "../supabaseInstance";
import cors from "cors";
const axios = require("axios");

import { submitContactForm } from "./routes/contactRoutes";
import { addTask } from "./routes/addTask";
import { getTaskById } from "./routes/getTaskById";
import { getAllTasks } from "./routes/getTask";
import { updateTask } from "./routes/updateTask";
import { deleteTask } from "./routes/deleteTask";

const app = express();

const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Home Route
app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Welcome to my final project. Capstone Server " });
});

app.post("/api/contact", submitContactForm);
app.get("/tasks", getAllTasks);
// app.get("/tasks/:id", getTaskById);
app.post("/tasks", addTask);
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);

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

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

export default app;
