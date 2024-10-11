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
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("../api"));
describe("Task API Tests", () => {
    let taskId; // Store task ID for use in multiple tests
    // Test 1: Create a new task
    test("POST /tasks should create a task and return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = {
            category: "Work",
            description: "Finish the project",
            date: "2024-10-10",
        };
        const response = yield (0, supertest_1.default)(api_1.default).post("/tasks").send(newTask);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Task added successfully");
        expect(response.body.data).toHaveProperty("id");
        taskId = response.body.data.id; // Save the task ID for future use
    }));
    // Test 2: Get all tasks
    test("GET /tasks should return an array of tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(api_1.default).get("/tasks");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    // Test 3: Get a specific task by ID
    test("GET /tasks/:id should return a specific task by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(api_1.default).get(`/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("id", taskId);
    }));
    // Test 4: Update a task by ID
    test("PUT /tasks/:id should update a task and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = {
            category: "Updated Work",
            description: "Update the project task",
            date: "2024-11-11",
        };
        const response = yield (0, supertest_1.default)(api_1.default)
            .put(`/tasks/${taskId}`)
            .send(updatedTask);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Task updated successfully");
    }));
    // Test 5: Delete a task by ID
    test("DELETE /tasks/:id should delete the task and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(api_1.default).delete(`/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Task deleted successfully");
    }));
});
