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
exports.updateTask = void 0;
const supabaseInstance_1 = __importDefault(require("../../supabaseInstance"));
// Update a task
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { category, description, date } = req.body;
    try {
        // Update the task using PATCH
        yield supabaseInstance_1.default.patch(`/notes?id=eq.${id}`, {
            category,
            description,
            date,
        });
        // Fetch the updated task to return it
        const updatedResponse = yield supabaseInstance_1.default.get(`/notes?id=eq.${id}`);
        // Extract the updated task from the response
        const updatedTask = updatedResponse.data[0];
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found." });
            return;
        }
        res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask, // Return the updated task data
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
