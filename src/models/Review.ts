import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  reviewText: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  category: 'Food' | 'Cleanliness' | 'Location' | 'Host' | 'Value' | 'Experience';
  aiResponse: string;
  createdAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
    },
    sentiment: {
      type: String,
      required: [true, 'Sentiment is required'],
      enum: ['Positive', 'Neutral', 'Negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Food', 'Cleanliness', 'Location', 'Host', 'Value', 'Experience'],
    },
    aiResponse: {
      type: String,
      required: [true, 'AI Response is required'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
