import { dbConnect } from "@/services/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user-model";
import bcrypt from "bcryptjs"

export async function POST(request) {
  const formData = await request.json();
  const { password, ...rest } = formData;
  console.log(formData);

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = { ...rest, password:hashedPassword };
  console.log("newUser", newUser);

  await dbConnect();
  try {
    await User.create(newUser);

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
   return new NextResponse(error.message, {
     status: 500,
   });
}
}
