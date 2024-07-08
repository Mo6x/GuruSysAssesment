import Post, { IPost } from "../../models/modelPost";


export const getPostService = async (id: string): Promise<IPost | null> => {
  return Post.findById(id)
    .populate('author', 'username email')
    .populate('likes')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username email' },
    });
};
