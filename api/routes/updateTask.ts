import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";
import { Task } from "../../types";

interface NoteResponse {
  id: string;
  category: string;
  description: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

// Update a task
export const updateTask = async (
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

    const updatedTask: NoteResponse | undefined = updatedResponse.data[0];

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found." });
      return;
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
