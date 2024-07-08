import Post, { IPost } from "../../models/modelPost";


export const getPostsService = async (): Promise<IPost[]> => {
  return Post.find()
    .populate('author', 'username email')
    .populate('likes')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username email' },
    });
};
