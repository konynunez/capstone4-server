import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";
import { NoteResponse } from "../../types";

// Get a note by ID
export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await instance.get<NoteResponse[]>(`/notes?id=eq.${id}`);

    // Check if the note exists
    if (response.data.length === 0) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({
      message: "Note fetched successfully",
      data: response.data[0],
    });
  } catch (error: any) {
    console.error("Error fetching note:", error.message);
    next(new Error("Failed to fetch note"));
  }
};
