import { Request, Response } from "express";
import { loginUser } from "../services/loginServices/loginService";


export const loginAuthenticate= async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    res.status(200).json({    message: "Login Successful", token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in user' });
  }
};
