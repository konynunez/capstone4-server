// Define types for the API documentation
interface ExampleResponse {
  id?: string;
  category?: string;
  description?: string;
  date?: string;
  message?: string;
}

interface Endpoint {
  method: string;
  route: string;
  description: string;
  requiredFields?: string[];
  exampleRequestBody?: ExampleResponse;
  exampleResponse: ExampleResponse | { notes: ExampleResponse[] };
}

interface Docs {
  message: string;
  endpoints: {
    [key: string]: Endpoint;
  };
}

// The API documentation
const docs: Docs = {
  message: "Welcome to the Notes API!",
  endpoints: {
    getAllNotes: {
      method: "GET",
      route: "/notes",
      description: "Fetches all notes from the database.",
      exampleResponse: {
        notes: [
          {
            id: "20437b26-8e63-4fdf-9ab9-3797a7385cb5",
            category: "Work",
            description: "Complete project",
            date: "2023-10-12",
          },
          {
            id: "76af5dc2-bf5a-480e-beff-e4a13af87ffb",
            category: "Personal",
            description: "Buy groceries",
            date: "2023-10-13",
          },
        ],
      },
    },
    getNoteById: {
      method: "GET",
      route: "/notes/:id",
      description: "Fetches a single note by ID.",
      exampleResponse: {
        id: "20437b26-8e63-4fdf-9ab9-3797a7385cb5",
        category: "Work",
        description: "Complete project",
        date: "2023-10-12",
      },
    },
    addNote: {
      method: "POST",
      route: "/notes",
      description: "Adds a new note to the database.",
      requiredFields: ["category", "description", "date"],
      exampleRequestBody: {
        category: "Personal",
        description: "Go to the gym",
        date: "2023-10-14",
      },
      exampleResponse: {
        id: "a7438d4e-94ef-4bcb-98f9-678b756f4d2f",
        category: "Personal",
        description: "Go to the gym",
        date: "2023-10-14",
      },
    },
    updateNoteById: {
      method: "PUT",
      route: "/notes/:id",
      description: "Updates an existing note by ID.",
      requiredFields: ["category", "description", "date"],
      exampleRequestBody: {
        category: "Updated Work",
        description: "Finish new project",
        date: "2023-10-15",
      },
      exampleResponse: {
        message: "Note updated successfully.",
      },
    },
    deleteNoteById: {
      method: "DELETE",
      route: "/notes/:id",
      description: "Deletes a note by ID.",
      exampleResponse: {
        message: "Note deleted successfully.",
      },
    },
  },
};

export default docs;
