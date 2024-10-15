require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";

const cors = require("cors");

import docs from "./routes/docs";
import { submitContactForm } from "./routes/contactRoutes";
import { addNote } from "./routes/addNotes";
import { getNoteById } from "./routes/getNotesById";
import { getAllNotes } from "./routes/getNotes";
import { updateNote } from "./routes/updateNotes";
import { deleteNote } from "./routes/deleteNotes";

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT_URL || "https://capstone4-client.vercel.app/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json(docs);
});

app.post("/api/contact", submitContactForm);
app.get("/notes", getAllNotes);
app.get("/notes/:id", getNoteById);
app.post("/notes", addNote);
app.put("/notes/:id", updateNote);
app.delete("/notes/:id", deleteNote);

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

app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

export default app;
