import Testimonials from "@/components/Testimonials";
import RelatedProducts from "@/components/RelatedProducts";
import CourseIntro from "./_components/CourseIntro";
import CourseDetails from "./_components/CourseDetails";
import { getCourseDetails, getCourseList } from "@/queries/courses";

const SingleCoursePage = async ({ params: { id } }) => {
  const courses = await getCourseList(); //it will be replaced later
  const course = await getCourseDetails(id);

  return (
    <>
      <CourseIntro course={course} />
      <CourseDetails course={course} />

      {/* {course?.testimonials && (
        <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />
      )} */}

      <RelatedProducts courses={courses} />
    </>
  );
};
export default SingleCoursePage;
