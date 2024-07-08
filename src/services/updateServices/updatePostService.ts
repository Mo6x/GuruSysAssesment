import Post, { IPost } from "../../models/modelPost";


export const updatePostService = async (
  id: string,
  title: string,
  content: string,
  description: string,
  userId: string
): Promise<IPost | null> => {
  const post = await Post.findById(id);

  if (!post || post.author.toString() !== userId) {
    throw new Error('Not authorized or post not found');
  }

  post.title = title;
  post.content = content;
  post.description = description;
  await post.save();

  return post;
};
