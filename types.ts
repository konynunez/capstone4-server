export interface Task {
  id: string;
  category: string;
  description: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}
interface ContactResponse {
  id: string; // or UUID
  name: string;
  email: string;
  phone?: string;
  details?: string;
  created_at: string; // or Date
}

interface NoteResponse {
  id: string;
  category: string;
  description: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}
interface ApiResponse {
  data: NoteResponse[];
}
