"use server";

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { userModel } from "@/models/user.model";

const getUser = async () => {
  const session = await auth();
  const user = await userModel.findOne({ email: session.user.email });
};
