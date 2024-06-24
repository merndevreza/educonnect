"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const EnrollCourse = ({ isLink, course }) => {
  const formAction = async (data) => {
    const { url } = await createCheckoutSession(data);
    window.location.assign(url);
  };
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={course?.id} />
        <input type="hidden" name="courseTitle" value={course?.title} />
        <input type="hidden" name="coursePrice" value={course?.price} /> 
        {isLink ? (
          <Button variant="ghost" className="text-xs text-sky-700 h-7 gap-1">
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button size="lg">Enroll Now</Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
