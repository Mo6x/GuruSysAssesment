import mongoose, { Document, Schema } from "mongoose";


export interface IPost extends Document {
  title: string;
  content: string;
  description: string;
  author: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>('Post', PostSchema);
