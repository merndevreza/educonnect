import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
  courseId: {
    required: true,
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

export const Testimonial =
  mongoose.models.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);