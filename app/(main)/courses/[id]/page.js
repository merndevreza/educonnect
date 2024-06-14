import Testimonials from "@/components/Testimonials";
import RelatedProducts from "@/components/RelatedProducts";
import CourseIntro from "./_components/CourseIntro";
import CourseDetails from "./_components/CourseDetails";
import { getCourseDetails, getCourseList } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";
 
const SingleCoursePage = async ({ params: { id } }) => {
  const courses = await getCourseList()
  const course = await getCourseDetails(id);
  console.log(course);
  return (
    <>
      <CourseIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />
      <CourseDetails course={course} />

      {course?.testimonials && (
        <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />
      )}

      <RelatedProducts courses={courses} />
    </>
  );
};
export default SingleCoursePage;
