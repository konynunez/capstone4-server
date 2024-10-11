require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import supabase from "./supabaseInstance";
import cors from "cors";
const axios = require("axios");

import { submitContactForm } from "./routes/contactRoutes";
import { addNote } from "./routes/addNotes";
import { getNoteById } from "./routes/getNotesById";
import { getAllNotes } from "./routes/getNotes";
import { updateNote } from "./routes/updateNotes";
import { deleteNote } from "./routes/deleteNotes";
import {
  fetchUnsplashImages,
  fetchJsonPlaceholderPosts,
} from "./routes/images";

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
app.get("/notes", getAllNotes);
app.get("/notes/:id", getNoteById);
app.post("/notes", addNote);
app.put("/notes/:id", updateNote);
app.delete("/notes/:id", deleteNote);
app.get("/api/unsplash", fetchUnsplashImages);
app.get("/api/posts", fetchJsonPlaceholderPosts);

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
