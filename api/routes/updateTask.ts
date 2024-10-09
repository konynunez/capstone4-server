import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";

// Update a task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { category, description, date } = req.body;

  try {
    const response = await instance.patch(`/notes?id=eq.${id}`, {
      category,
      description,
      date,
    });

    res.status(200).json({
      message: "Task updated successfully",
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
