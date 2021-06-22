import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    storyTitle: { type: String },
    title: { type: String },
    author: { type: String, required: true },
    description: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at' } },
);

export interface Post extends mongoose.Document {
  _id: string;
  storyTitle: string;
  title: string;
  author: string;
  description?: string | { comment_text: { value: string } };
  deleted?: boolean;
}
