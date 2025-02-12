"use server";

import { connectToDB } from "@/lib/connectToDB";
import { uploadImage } from "@/lib/upload";
import { userModel } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getUser = async (req) => {
  const session = await getServerSession();

  if (!session) {
    return;
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

export const updateAvatar = async (file) => {
  const { url } = await uploadImage(file, "avatars");
  const res = await updateUser({ image: url });
  if (!res?.image) {
    return { success: false, error: "দুঃখিত কিছু সময় পর চেষ্টা করুন" };
  }
  return { success: true, msg: "প্রোফাইল আপডেট সফল হয়েছে" };
};

export const updateUser = async (update) => {
  const { name, phone, status, image, isActive } = update;
  const session = await getServerSession();

  if (!session) {
    return { success: false, error: "দুঃখিত অননুমোদিত ইউসার " };
  }

  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (phone !== undefined) updateFields.phone = phone;
  if (status !== undefined) updateFields.status = status;
  if (image !== undefined) updateFields.image = image;
  if (isActive !== undefined) updateFields.isActive = isActive;

  if (Object.keys(updateFields).length === 0) {
    return { success: false, error: "কোনো আপডেট করা ডাটা নেই।" };
  }

  const user = await userModel.findOneAndUpdate(
    { email: session.user.email },
    { $set: updateFields }
  );

  if (!user) {
    return { success: false, error: "ব্যবহারকারী খুঁজে পাওয়া যায়নি।" };
  }

  return { success: true, user };
};
