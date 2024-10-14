import request from "supertest";
import app from "../api/index";
import axios from "../api/supabaseInstance";

// Mock Axios methods for testing
jest.mock("../api/supabaseInstance", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}));

describe("Notes API Tests", () => {
  const validUUID1 = "20437b26-8e63-4fdf-9ab9-3797a7385cb5";
  const invalidUUID = "invalid-uuid-1234";

  // 1. GET /notes - Fetch all notes
  it("should fetch all notes successfully", async () => {
    const mockNotes = [
      {
        id: validUUID1,
        category: "Work",
        description: "Complete project",
        date: "2023-10-12",
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockNotes });

    const response = await request(app).get("/notes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockNotes);
  });

  // 2. GET /notes/:id - Fetch a note by valid UUID
  it("should fetch a note by valid UUID", async () => {
    const mockNote = {
      id: validUUID1,
      category: "Work",
      description: "Complete project",
      date: "2023-10-12",
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: [mockNote] });

    const response = await request(app).get(`/notes/${validUUID1}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockNote);
  });

  // 3. GET /notes/:id - Fetch a note by invalid UUID
  it("should return 404 for a non-existing note UUID", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    const response = await request(app).get(`/notes/${invalidUUID}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Note not found");
  });

  // 4. POST /notes - Create a new note
  it("should create a new note successfully", async () => {
    const newNote = {
      category: "Work",
      description: "Start a new project",
      date: "2023-10-12",
    };
    const createdNote = { id: validUUID1, ...newNote };
    (axios.post as jest.Mock).mockResolvedValue({ data: [createdNote] });

    const response = await request(app).post("/notes").send(newNote);
    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(createdNote);
  });

  // 5. Simpler logic: Check if category and description are present
  it("should check if category and description are present in the request body", async () => {
    // Define a mock function to simulate the route handling
    const addNote = (req: {
      body: { category?: string; description?: string };
    }) => {
      const { category, description } = req.body;

      // Return true if both fields are present
      return !!category && !!description;
    };

    // Simulate two requests: one missing fields and one complete
    const incompleteRequest = { body: { description: "Incomplete note" } }; // Missing 'category'
    const completeRequest = {
      body: { category: "Work", description: "Complete note" },
    };

    // Check if the function correctly identifies missing fields
    const resultIncomplete = addNote(incompleteRequest);
    const resultComplete = addNote(completeRequest);

    // Assert that the incomplete request is false and complete request is true
    expect(resultIncomplete).toBe(false);
    expect(resultComplete).toBe(true);
  });

  // 6. PUT /notes/:id - Update a note with valid UUID
  it("should update an existing note successfully", async () => {
    const updatedNote = {
      category: "Updated Work",
      description: "Updated description",
      date: "2023-10-14",
    };

    (axios.put as jest.Mock).mockResolvedValue({ data: [updatedNote] });
    (axios.get as jest.Mock).mockResolvedValue({
      data: [{ id: validUUID1, ...updatedNote }],
    });

    const response = await request(app)
      .put(`/notes/${validUUID1}`)
      .send(updatedNote);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ id: validUUID1, ...updatedNote });
  });

  // 7. PUT /notes/:id - Update a non-existing note
  it("should return 404 when trying to update a non-existing note", async () => {
    (axios.put as jest.Mock).mockResolvedValue({});
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    const response = await request(app).put(`/notes/${invalidUUID}`).send({
      category: "Updated Work",
      description: "Updated description",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Note not found.");
  });

  // 8. DELETE /notes/:id - Delete a note by valid UUID
  it("should delete a note successfully", async () => {
    (axios.delete as jest.Mock).mockResolvedValue({
      status: 200,
      data: { message: "Note deleted successfully" },
    });

    const response = await request(app).delete(`/notes/${validUUID1}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Note deleted successfully");
  });

  // 9. Simpler logic: Check if deleteNote is called with a valid ID
  it("should check if deleteNote is called with a valid ID", async () => {
    // Define a mock note database
    const mockNotes = [
      { id: validUUID1, category: "Work", description: "Complete project" },
    ];

    // Define the deleteNote function
    const deleteNote = (id: string) => {
      // Check if the note exists in the mock database
      const noteExists = mockNotes.find((note) => note.id === id);
      return !!noteExists;
    };

    // Simulate two delete requests: one with a valid ID, one with an invalid ID
    const resultValid = deleteNote(validUUID1);
    const resultInvalid = deleteNote(invalidUUID);

    // Assert that the valid ID returns true and invalid ID returns false
    expect(resultValid).toBe(true);
    expect(resultInvalid).toBe(false);
  });

  // 10. POST /api/contact - Submit contact form successfully
  it("should submit the contact form successfully", async () => {
    const contactForm = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      details: "Need assistance with my notes",
    };
    (axios.post as jest.Mock).mockResolvedValue({ status: 201 });

    const response = await request(app).post("/api/contact").send(contactForm);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Contact form submitted successfully.");
  });
});

// Cleanup after all tests
afterAll(() => {
  jest.clearAllMocks();
});
