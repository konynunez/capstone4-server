import { Request, Response, NextFunction } from "express";
import instance from "../supabaseInstance";

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    res.status(400).json({ message: "Invalid UUID format" });
    return;
  }

  try {
    const response = await instance.delete(`/notes?id=eq.${id}`);

    if (Array.isArray(response.data) && response.data.length === 0) {
      res.status(404).json({ message: "Note not found or already deleted." });
      return;
    }

    res.status(200).json({
      message: "Note deleted successfully",
      data: response.data,
    });
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Error deleting note:",
        error.response.data || error.message
      );
      next(error);
    } else {
      console.error("Unexpected error:", error.message);
      next(new Error("An unexpected error occurred"));
    }
  }
};
