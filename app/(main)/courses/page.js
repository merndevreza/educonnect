import SearchCourse from "./_components/SearchCourse";
import SortCourses from "./_components/SortCourses";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import { getCourseList } from "@/queries/courses";
import CourseGrid from "@/components/CourseGrid"; 

const CoursesPage = async () => {
  const courses = await getCourseList(); 
  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      {/* header */}
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse />

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourses />
          <FilterCourseMobile />
        </div>
      </div>
      {/* header ends */}
      <ActiveFilters
        filter={{
          categories: ["development"],
          price: ["free"],
          sort: "",
        }}
      />
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <FilterCourse />
          <CourseGrid className="lg:col-span-3" courses={courses} />
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;
