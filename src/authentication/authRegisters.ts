import { Request, Response } from 'express';
import { registerUser } from "../services/registerService/registerService";


export const registerAuthenticate = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};
