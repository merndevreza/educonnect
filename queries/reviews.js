import { Review } from "@/models/review-model";

export async function getAllReviewsByCourseId(courseId) {
  const found = await Review.find({ course: courseId}).lean();

  return found;
}
