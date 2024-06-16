import { Accordion } from "@/components/ui/accordion";
import { BookCheck, Clock10 } from "lucide-react";
import CourseModuleList from "./Modules/CourseModuleList";
const CourseCurriculum = ({ course }) => {
  console.log("curriculum", course);
  const totalDuration =
    course?.modules.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.duration;
    }, 0) / 60;
  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {totalDuration.toPrecision(2)}+ Hours
        </span>
        {/* <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span> */}
      </div>
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible
        className="w-full"
      >
{course?.modules.map(module=><CourseModuleList key={module._id.toString()} module={module}/>)}

      </Accordion>
    </>
  );
};

export default CourseCurriculum;
