import { Request, Response } from "express";
import { likePostService } from "../../services/likeServices/likePostService";


export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await likePostService(id, req.user.id);
    res.status(200).json({ message: 'Post liked/unliked' });
  } catch (error) {
    res.status(400).json({ error: 'Error liking/unliking post' });
  }
};
