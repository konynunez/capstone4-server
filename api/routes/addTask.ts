import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";

// Add a new task
export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { category, description, date } = req.body;

  try {
    const response = await instance.post("/notes", {
      category,
      description,
      date,
    });

    res.status(201).json({
      message: "Task added successfully",
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
