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
exports.addTask = void 0;
const supabaseInstance_1 = __importDefault(require("../../supabaseInstance"));
// Add a new task
const addTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { category, description, date } = req.body;
    // Ensure date is provided, or set to current date if empty
    if (!date) {
        date = new Date().toISOString().split("T")[0]; // Set to current date in YYYY-MM-DD format
    }
    try {
        console.log("Data being sent:", { category, description, date });
        const response = yield supabaseInstance_1.default.post("/notes", {
            category,
            description,
            date,
        });
        // Check if Supabase returns a valid response
        if (response.data &&
            Array.isArray(response.data) &&
            response.data.length > 0) {
            res.status(201).json({
                message: "Task added successfully",
                data: response.data[0], // Assuming the first item in the array is the task
            });
        }
        else {
            res.status(500).json({
                message: "Failed to add task. No data returned from Supabase.",
            });
        }
    }
    catch (error) {
        console.error("Error from Supabase:", error.response ? error.response.data : error.message);
        res.status(400).json({
            message: "Task creation failed.",
            error: error.response ? error.response.data : error.message,
        });
    }
});
exports.addTask = addTask;
