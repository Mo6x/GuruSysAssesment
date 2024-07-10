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

export const createPost = async (req: Request | any, res: Response) => {
  try {
    console.log(req.body);
    
    const { title, content, description } = req.body;
    const author = req.user.id;

    if (req.files && req.files.length > 0) {
      const post = await createPostService(title, content, description, author, req.files);
      return res.status(201).json(post);
    } else {
      const post = await createPostService(title, content, description, author);
      return res.status(200).json(post);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error creating post' });
  }
};
