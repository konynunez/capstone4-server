import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";

export const addNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let { category, description, date } = req.body;

  if (!date) {
    date = new Date().toISOString().split("T")[0];
  }

  try {
    console.log("Data being sent:", { category, description, date });

    const response = await instance.post(
      "/notes",
      {
        category,
        description,
        date,
      },
      {
        headers: {
          Prefer: "return=representation",
        },
      }
    );

    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      res.status(201).json({
        message: "Note added successfully",
        data: response.data[0],
      });
    } else {
      console.log("Supabase response:", response);

      res.status(500).json({
        message: "Failed to add note. No data returned from Supabase.",
      });
    }
  } catch (error: any) {
    console.error(
      "Error from Supabase:",
      error.response ? error.response.data : error.message
    );
    res.status(400).json({
      message: "Note creation failed.",
      error: error.response ? error.response.data : error.message,
    });
  }
};
