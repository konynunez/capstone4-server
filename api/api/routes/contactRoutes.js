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
exports.submitContactForm = void 0;
const supabaseInstance_1 = __importDefault(require("../../supabaseInstance"));
// POST route to handle contact form submissions
const submitContactForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, details } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: "Name and email are required." });
            return;
        }
        // Insert the contact data into Supabase
        const response = yield supabaseInstance_1.default.post("/contacts", {
            name,
            email,
            phone,
            details,
            created_at: new Date().toISOString(),
        });
        if (response.status === 201) {
            res.status(201).json({ message: "Contact form submitted successfully." });
        }
        else {
            res
                .status(response.status)
                .json({ error: "Failed to submit the contact form." });
        }
    }
    catch (error) {
        console.error("Error submitting contact form:", error);
        next(error);
    }
});
exports.submitContactForm = submitContactForm;
