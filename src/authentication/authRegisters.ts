import { Request, Response } from "express";
import { registerUser } from "../services/registerService/registerService";
import { handleError } from "../utils/errorHandler";


export const registerAuthenticate = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await registerUser(username, email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    const err = error as Error;
    console.error(err);
    if (err.message === 'Email already in use') {
      return handleError(res, 400, 'Email already in use');
    }
    handleError(res, 500, 'Error registering user');
  }
};
