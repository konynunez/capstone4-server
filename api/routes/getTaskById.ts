import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const response = await instance.get(`/tasks?id=eq.${id}`);
    const task = response.data;

    if (Array.isArray(task) && task.length > 0) {
      return res.status(200).json({ message: "Task fetched", data: task[0] });
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
};
