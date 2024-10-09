import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";

// Delete a task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await instance.delete(`/notes?id=eq.${id}`);

    res.status(200).json({
      message: "Task deleted successfully",
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
