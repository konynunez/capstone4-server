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
exports.deleteTask = void 0;
const supabaseInstance_1 = __importDefault(require("../../supabaseInstance"));
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        res.status(400).json({ message: "Invalid UUID format" });
        return;
    }
    try {
        // Make DELETE request to Supabase
        const response = yield supabaseInstance_1.default.delete(`/notes?id=eq.${id}`);
        // Check if the response is empty
        if (Array.isArray(response.data) && response.data.length === 0) {
            res.status(404).json({ message: "Task not found or already deleted." });
            return;
        }
        // Successfully deleted task
        res.status(200).json({
            message: "Task deleted successfully",
            data: response.data,
        });
    }
    catch (error) {
        if (error.response) {
            console.error("Error deleting task:", error.response.data || error.message);
            next(error);
        }
        else {
            console.error("Unexpected error:", error.message);
            next(new Error("An unexpected error occurred"));
        }
    }
});
exports.deleteTask = deleteTask;
