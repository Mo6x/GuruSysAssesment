import mongoose from 'mongoose';
import Post from "../../models/modelPost";
import Comment, { IComment } from "../../models/modelComment";


export const commentPostService = async (
  postId: string,
  userId: string,
  content: string
): Promise<IComment> => {
  const newComment: IComment = new Comment({ post: postId, author: userId, content });
  const comment = await newComment.save();

  const post = await Post.findById(postId);
  if (post) {
    const commentId = comment._id as mongoose.Types.ObjectId;
    post.comments.push(commentId);
    await post.save();
  }

  return comment;
};
