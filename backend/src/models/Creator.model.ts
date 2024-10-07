import mongoose, { Document, Schema } from 'mongoose';
import { BlinkPostDoc } from './BlinkPost.model';

export interface CreatorDoc extends Document {
  name: string;
  email: string;
  blinkPostsIDs: mongoose.Schema.Types.ObjectId[];
  totalRevenue: number;
  walletAddress: string | null;
  subscriptionPrice: number;
}

const creatorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    blinkPosts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'BlinkPost' }
    ],
    totalRevenue: { type: Number, default: 0 },
    walletAddress: { type: String },
    subscribers: { type: [String], required: true, default: [] },
    subscriptionPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Creator = mongoose.model<CreatorDoc>('Creator', creatorSchema);

export default Creator;