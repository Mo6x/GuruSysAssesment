import Like, { ILike } from "../../models/modelLike";

export const likePostService = async (
  postId: string,
  userId: string,
  like_post: boolean
): Promise<void> => {
  const like = await Like.findOne({ post: postId, user: userId });

  if (like) {
    await Like.deleteOne({ _id: like._id });
  } else {
    await new Like({ post: postId, user: userId, like_post }).save();
  }
};
