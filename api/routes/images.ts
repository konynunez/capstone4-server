import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const fetchUnsplashImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    handleAxiosError(error, "Unsplash API", next);
  }
};

export const fetchJsonPlaceholderPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Return data as JSON response
    res.status(200).json(response.data);
  } catch (error: any) {
    handleAxiosError(error, "JSONPlaceholder API", next);
  }
};

const handleAxiosError = (
  error: any,
  apiName: string,
  next: NextFunction
): void => {
  if (error.response) {
    console.error(`Axios error fetching ${apiName}:`, error.response.data);
    next(
      new Error(`Error fetching data from ${apiName}: ${error.response.data}`)
    );
  } else if (error.request) {
    console.error(`No response received from ${apiName}:`, error.request);
    next(new Error(`No response received from ${apiName}`));
  } else {
    console.error(`Error setting up request to ${apiName}:`, error.message);
    next(new Error(`Error setting up request to ${apiName}: ${error.message}`));
  }
};
