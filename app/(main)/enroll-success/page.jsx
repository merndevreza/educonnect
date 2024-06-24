import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) {
    throw new Error("Please provide valid session Id that starts with cs_");
  }
  const userSession = await auth();
  if (!userSession?.user) {
    redirect("/login");
  }
  const course = await getCourseDetails(courseId);
  const user = await getUserByEmail(userSession?.user?.email);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // console.log(checkoutSession);
  const paymentStatus = checkoutSession?.payment_intent?.status;
  const paidAmount = checkoutSession?.payment_intent?.amount_received / 100;
  const paymentCurrency = checkoutSession?.payment_intent?.currency;
  //user info
  const userName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.email;

  //instructor info
  const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
  const instructorEmail = course?.instructor?.email;

  // Card holder info
  const cardHolderName = checkoutSession?.customer_details?.name;
  const cardHolderEmail = checkoutSession?.customer_details?.email;
  if (paymentStatus === "succeeded") {
    // Update DB (enrollment)

    //send email to the instructor, student, person who paid
    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New enrolment for ${course?.title}`,
        message: `Congratulations ${instructorName}! A new student ${userName} has enrolled to your ${course?.title} course just now. Please check from dashboard and give a high-five to your new student.`,
      },
      {
        to: userEmail,
        subject: `Enrolment Successful for ${course?.title}`,
        message: `Congratulations ${userName}! You have successfully enrolled at ${course?.title} course.`,
      },
    ];
    //Also send email to the card holder
    if (userEmail !== cardHolderEmail) {
      emailsToSend.push({
        to: cardHolderEmail,
        subject: `${userName} enrolled on ${course?.title} course by using your card`,
        message: `Dear ${cardHolderName}, ${userName} have successfully enrolled at ${course?.title} course by paying ${paymentCurrency} ${paidAmount} using your card.`,
      });
    }
    console.log(emailsToSend);
    // const sendEmailResponse = await sendEmails(emailsToSend);
    // console.log(sendEmailResponse);
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations <strong>{userName}</strong>! Your Enrollment was
              Successful for <strong>{course?.title}</strong>
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
