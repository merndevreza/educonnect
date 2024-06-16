import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lesson-model";


export async function getLessonById(id){
   const lesson=await Lesson.findById(id).lean()
   return replaceMongoIdInObject(lesson)
}