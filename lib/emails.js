import { Resend } from "resend";
import EmailTemplate from "@/components/emailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;
  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data?.to && data?.message && data?.subject) {
        const to = data?.to;
        const subject = data?.subject;
        const message = data?.message;

        const sentInfo = await resend.emails.send({
          from: "Educonnect <onboarding@resend.dev>",
          to,
          message,
          subject,
          react: EmailTemplate({ message }),
        });
        return sentInfo;
      } else {
        const rejectedPromise = new Promise((reject) => {
          return reject(
            new Error(
              `couldn't send email, please check ${JSON.stringify(data)}`
            )
          );
        });
        return rejectedPromise;
      }
    })
  );

  return response;
};
