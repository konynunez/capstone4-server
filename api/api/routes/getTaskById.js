"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskById = void 0;
const supabaseInstance_1 = __importDefault(require("../../supabaseInstance")); // Import your Axios instance
// Get task by ID using Axios
const getTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Fetch task from Supabase via Axios
        const response = yield supabaseInstance_1.default.get(`/tasks?id=eq.${id}`); // Adjust the table name
        const task = response.data;
        if (Array.isArray(task) && task.length > 0) {
            return res.status(200).json({ message: "Task fetched", data: task[0] });
        }
        else {
            return res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        // Pass any error to the error-handling middleware
        next(error);
    }
});
exports.getTaskById = getTaskById;
