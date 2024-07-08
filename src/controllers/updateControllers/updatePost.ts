import { Request, Response } from "express";
import { updatePostService } from "../../services/updateServices/updatePostService";


export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updatedPost = await updatePostService(id, title, content, description, req.user.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: 'Error updating post' });
  }
};
