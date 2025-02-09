"use server";

import { connectToDB } from "@/lib/connectToDB";
import { userModel } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getUser = async (req) => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  await connectToDB();
  const user = await userModel
    .findOne({ email: session.user.email })
    .select("-password");

  if (!user?._id) {
    return redirect("/social");
  }
  return user;
};
