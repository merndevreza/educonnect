import { User } from "@/models/user-model";

export async function getUserByEmail(email) {
  const response = await User.findOne({ email }).lean();

  return response;
}
