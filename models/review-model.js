import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  course: {
    required: true,
    type: Schema.ObjectId,
  },
  content: {
    required: true,
    type: String,
  }, 
  rating: {
    required: true,
    type: Number,
  }, 
});

export const Review =
  mongoose.models.Review ?? mongoose.model("Review", reviewSchema);
