"use server";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import { User } from "@/models/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getAllReviewsByCourseId } from "./reviews";
import { Review } from "@/models/review-model";

export async function getCourseList() {
  const courses = await Course.find()
    .select([
      "title",
      "thumbnail",
      "price",
      "category",
      "modules",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Review,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();

  return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Review,
      populate: {
        path: "student",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId) {
  const courses = await Course.find({ instructor: instructorId }).lean();

  //total students
  const enrollments = await Promise.allSettled(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  );
  const enrolledStudents = enrollments.flat();

  //total reviews
  const allTestimonials = await Promise.allSettled(
    courses.map(async (course) => {
      const singleCourseTestimonials = await getAllReviewsByCourseId(
        course._id.toString()
      );
      return singleCourseTestimonials;
    })
  );
  const allTestimonialsArray = allTestimonials.flat();

  const averageRating =
    allTestimonialsArray.reduce((accumulator, current) => {
      return accumulator + current.rating;
    }, 0) / allTestimonialsArray.length;
  return {
    courses: courses.length,
    students: enrolledStudents.length,
    reviews: allTestimonialsArray.length,
    averageRating:averageRating.toFixed(1),
  };
}
