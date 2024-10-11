"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios = require("axios");
const contactRoutes_1 = require("./routes/contactRoutes");
const addTask_1 = require("./routes/addTask");
const getTask_1 = require("./routes/getTask");
const updateTask_1 = require("./routes/updateTask");
const deleteTask_1 = require("./routes/deleteTask");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Home Route
app.get("/", (request, response, next) => {
    response.json({ message: "Welcome to my final project. Capstone Server " });
});
app.post("/api/contact", contactRoutes_1.submitContactForm);
app.get("/tasks", getTask_1.getAllTasks);
// app.get("/tasks/:id", getTaskById);
app.post("/tasks", addTask_1.addTask);
app.put("/tasks/:id", updateTask_1.updateTask);
app.delete("/tasks/:id", deleteTask_1.deleteTask);
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({
        error: "Something broke!",
        errorStack: error.stack,
        errorMessage: error.message,
    });
});
app.use((req, res) => {
    res.status(404).json({
        error: "Resource not found. Are you sure you're looking in the right place?",
    });
});
const server = app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
exports.default = app;
