import { dbConnect } from "@/services/dbConnect";
import { NextResponse } from "next/server";
import { User } from "@/models/user-model";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/queries/users";

export async function POST(request) {
  const formData = await request.json();
  const { password, ...rest } = formData;
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = { ...rest, password: hashedPassword };
  await dbConnect();
  try {
    const isUserAlreadyRegistered = await getUserByEmail(formData.email);
    if (isUserAlreadyRegistered) {
      return new NextResponse(JSON.stringify({ error: "User already created with this email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await User.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
