import Post, { IPost } from "../../models/modelPost";


export const createPostService = async (
  title: string,
  content: string,
  description: string,
  author: string,
  images?: Express.Multer.File[]
): Promise<IPost> => {
  try {
    const post = new Post({ title, content, description, author });

    if (images && images.length > 0) {
      post.images = images.map(file => ({ url: file.path, filename: file.filename }));
    }

    await post.save();
    return post;
  } catch (error) {
    throw new Error('Error creating post');
  }
};

