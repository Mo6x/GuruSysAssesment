import Post, { IPost } from "../../models/modelPost";


export const deletePostService = async (id: string, userId: string): Promise<void> => {
  const post = await Post.findOneAndDelete({ _id: id, author: userId }).exec();

  if (!post) {
    throw new Error('Not authorized or post not found');
  }

};
