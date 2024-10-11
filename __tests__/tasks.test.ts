import request from "supertest";
import app from "../api";

describe("Task API Tests", () => {
  let taskId: string; // Store task ID for use in multiple tests

  // Test 1: Create a new task
  test("POST /tasks should create a task and return 201", async () => {
    const newTask = {
      category: "Work",
      description: "Finish the project",
      date: "2024-10-10",
    };

    const response = await request(app).post("/tasks").send(newTask);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Task added successfully");
    expect(response.body.data).toHaveProperty("id");
    taskId = response.body.data.id; // Save the task ID for future use
  });

  // Test 2: Get all tasks
  test("GET /tasks should return an array of tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test 3: Get a specific task by ID
  test("GET /tasks/:id should return a specific task by ID", async () => {
    const response = await request(app).get(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("id", taskId);
  });

  // Test 4: Update a task by ID
  test("PUT /tasks/:id should update a task and return 200", async () => {
    const updatedTask = {
      category: "Updated Work",
      description: "Update the project task",
      date: "2024-11-11",
    };

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTask);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Task updated successfully"
    );
  });

  // Test 5: Delete a task by ID
  test("DELETE /tasks/:id should delete the task and return 200", async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Task deleted successfully"
    );
  });
});
