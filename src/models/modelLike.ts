import mongoose, { Document, Schema } from "mongoose";


export interface ILike extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LikeSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILike>('Like', LikeSchema);
