import { 
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 import { 
   FileQuestion,
   NotepadText,
   Radio,
   StickyNote,
   Tv,
   Video,
 } from "lucide-react";
import CourseLesson from "./CourseLesson";
const CourseModuleList = ({module}) => {
   return (
      <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger>{module?.title}</AccordionTrigger>
          <AccordionContent>
            {/* header */}
            <div class="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                {module?.lessonIds.length} Lessons
              </span>
              {/* <span className="flex items-center gap-1.5">
                <NotepadText className="w-4 h-4" />
                10 Notes
              </span>
              <span className="flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4" />
                10 Quiz
              </span>
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4" />1 Live Class
              </span> */}
            </div> 

            <div className="space-y-3"> 
             {module?.lessonIds && module?.lessonIds.map(lessonId=><CourseLesson key={lessonId} lessonId={lessonId}/>)}
            </div>
          </AccordionContent>
        </AccordionItem> 
   );
};

export default CourseModuleList;