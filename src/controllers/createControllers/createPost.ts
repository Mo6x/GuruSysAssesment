import { Request, Response } from "express";
import { createPostService } from "../../services/createServices/createPostService";


export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, description } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const author = req.user.id;
    const post = await createPostService(title, content, description, author);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error creating post' });
  }
};
