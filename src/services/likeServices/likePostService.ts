import Like from "../../models/modelLike";


export const likePostService = async (postId: string, userId: string): Promise<void> => {
  const like = await Like.findOne({ post: postId, user: userId });

  if (like) {
    await Like.deleteOne({ _id: like._id });
  } else {
    await new Like({ post: postId, user: userId }).save();
  }
};
