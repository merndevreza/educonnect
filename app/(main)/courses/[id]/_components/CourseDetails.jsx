import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  CheckCheck,
  Presentation,
  UsersRound,
  Star,
  MessageSquare,
  BookCheck,
  Clock10,
  Radio,
  Video,
  NotepadText,
  FileQuestion,
  Tv,
  StickyNote,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { formatMyDate } from "@/lib/formatDate";
import CourseOverview from "./CourseOverview";
import CourseCurriculum from "./CourseCurriculum";
import CourseInstructor from "./CourseInstructor";

const CourseDetails = async ({ course }) => {
  const instructor = await replaceMongoIdInObject(course.instructor);
  const category = await replaceMongoIdInObject(course.category);

  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="bg-success px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
          {category?.title}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {course?.title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">{course?.description}</p>
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            <Image
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={instructor?.profilePicture}
              alt={`${instructor?.firstName} ${instructor?.lastName}`}
              width={50}
              height={50}
            />
            <p className="font-bold">{`${instructor?.firstName} ${instructor?.lastName}`}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">Last Updated: </span>
            <span>{formatMyDate(course?.modifiedOn)}</span>
          </div>
        </div>
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <CourseOverview description={course?.description} learning={course?.learning}/>
            </TabsContent>
            <TabsContent value="curriculum">
              <CourseCurriculum course={course} />
            </TabsContent>
            <TabsContent value="instructor">
              <CourseInstructor instructor={instructor} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
