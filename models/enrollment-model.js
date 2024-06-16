import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: "User",
  },
  course: {
    required: true,
    type: Schema.ObjectId,
  },
  status: {
    required: true,
    type: String,
  },
  enrollment_date: {
    required: true,
    type: Date,
  },
  completion_date: {
    required: true,
    type: Date,
  },
  method: {
    required: true,
    type: String,
  },
});

export const Enrollment =
  mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);
