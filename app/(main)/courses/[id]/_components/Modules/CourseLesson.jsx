import { cn } from "@/lib/utils";
import { getLessonById } from "@/queries/lessons";
import { Tv } from "lucide-react";

const CourseLesson = async({lessonId}) => {
   const lesson=await getLessonById(lessonId)
   return (
      <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className={cn("text-slate-500")} />
        {lesson?.title}
      </div>
    </button> 
   );
};

export default CourseLesson;