import { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { createPostService } from "../../services/createServices/createPostService";
import path from "path";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const author = req.user.id;

    upload.array('images', 5)(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error uploading files' });
      } else if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      try {
        const post = await createPostService(title, content, description, author, req.files as Express.Multer.File[]);
        res.status(201).json(post);
      } catch (error) {
        res.status(400).json({ error: 'Error creating post' });
      }
    });

  } catch (error) {
    res.status(400).json({ error: 'Error creating post' });
  }
};
