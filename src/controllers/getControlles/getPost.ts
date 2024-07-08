import { Request, Response } from "express";
import { getPostsService } from "../../services/getServices/getPostsService";


export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPostsService();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching posts' });
  }
};
