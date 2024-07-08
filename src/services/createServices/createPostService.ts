import Post, { IPost } from "../../models/modelPost";


export const createPostService = async (
  title: string,
  content: string,
  description: string,
  author: string
): Promise<IPost> => {
  const post = new Post({ title, content, description, author });
  await post.save();
  return post;
};
