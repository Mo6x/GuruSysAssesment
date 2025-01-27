import { Router } from "express";
import multer from 'multer';

import { authMiddleware } from "../middleware/authMiddleware";
import { getPosts } from "../controllers/getControlles/getPost";
import { getPost } from "../controllers/getController/getPost";
import { likePost } from "../controllers/likeControllers/likePost";
import { createPost } from "../controllers/createControllers/createPost";
import { updatePost } from "../controllers/updateControllers/updatePost";
import { deletePost } from "../controllers/deleteControllers/deletePost";
import {commentPost} from "../controllers/commentControllers/commentPost";


const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authMiddleware, upload.array('images', 5), createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/comment', authMiddleware, commentPost);

export default router;
