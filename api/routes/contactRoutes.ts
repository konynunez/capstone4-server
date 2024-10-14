import { Request, Response, NextFunction } from "express";
import instance from "../../supabaseInstance";

export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, details } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required." });
      return;
    }

    const response = await instance.post("/contacts", {
      name,
      email,
      phone,
      details,
      created_at: new Date().toISOString(),
    });

    if (response.status === 201) {
      res.status(201).json({ message: "Contact form submitted successfully." });
    } else {
      res
        .status(response.status)
        .json({ error: "Failed to submit the contact form." });
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    next(error);
  }
};
