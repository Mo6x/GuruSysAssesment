import { Request, Response } from "express";
import { getPostService } from "../../services/getService/getPostService";


export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getPostService(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching post' });
  }
};
