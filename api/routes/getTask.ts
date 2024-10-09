import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";
import { Task } from "../../types";

// Get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await instance.get("/notes");

    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};
