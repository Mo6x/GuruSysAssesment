import { Request, Response } from "express";
import { deletePostService } from "../../services/deleteServices/deletePostService";



export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await deletePostService(id, req.user.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting post' });
  }
};

