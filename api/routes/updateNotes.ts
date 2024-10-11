import { Request, Response, NextFunction } from "express";
import instance from "../supabaseInstance";

interface NoteResponse {
  id: string;
  category: string;
  description: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

// Update a note
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { category, description, date } = req.body;

  try {
    await instance.patch(`/notes?id=eq.${id}`, {
      category,
      description,
      date,
    });

    const updatedResponse = await instance.get<NoteResponse[]>(
      `/notes?id=eq.${id}`
    );

    const updatedNote: NoteResponse | undefined = updatedResponse.data[0];

    if (!updatedNote) {
      res.status(404).json({ message: "Note not found." });
      return;
    }

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};
