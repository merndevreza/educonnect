import { cn } from "@/lib/utils";
import CourseCard from "./CourseCard";

const CourseGrid = ({ courses, className }) => {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4",
        className
      )}
    >
     {courses.map((course) => <CourseCard key={course.id} course={course}/>)}
    </div>
  );
};

export default CourseGrid;
