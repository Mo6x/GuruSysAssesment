import { Request, Response } from "express";
import { commentPostService } from "../../services/commetServices/commentPostService";


export const commentPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const comment = await commentPostService(id, req.user.id, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Error commenting on post' });
  }
};
