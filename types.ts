// types/index.ts or types/types.ts (depending on your file naming)

export interface Task {
  id: string; // Use UUID if your IDs are UUIDs
  category: string;
  description: string;
  date: string;
  created_at?: string; // Optional; could be string or Date
  updated_at?: string; // Optional; could be string or Date
}

export interface ContactResponse {
  id: string; // Use UUID if your IDs are UUIDs
  name: string;
  email: string;
  phone?: string; // Optional; to represent the phone number
  details?: string; // Optional; additional details about the contact
  created_at: string; // Store as a string representing the date
}

export interface NoteResponse {
  id: string; // Use UUID if your IDs are UUIDs
  category: string;
  description: string;
  date: string;
  created_at?: string; // Optional; could be string or Date
  updated_at?: string; // Optional; could be string or Date
}

// General API response structure for note retrieval
export interface ApiResponse<T> {
  data: T[];
}
