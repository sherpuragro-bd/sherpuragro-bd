"use server";

import { connectToDB } from "@/lib/connectToDB";
import { uploadImage } from "@/lib/upload";
import { AddressModel } from "@/models/address.model";
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
    .select("-password")
    .lean();

  if (!user?._id) {
    return redirect("/social");
  }
  return { ...user };
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
  await connectToDB();
  const user = await userModel
    .findOneAndUpdate({ email: session.user.email }, { $set: updateFields })
    .lean();

  if (!user) {
    return { success: false, error: "ব্যবহারকারী খুঁজে পাওয়া যায়নি।" };
  }

  return { success: true, user };
};

export const GetAllAddress = async () => {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return "কোন ইউজার খুঁজে পাওয়া যাইনি";
  }

  await connectToDB();
  const allAddress = await AddressModel.find({
    author: session.user.email,
  })
    .sort({ createdAt: -1 })
    .lean();

  return allAddress.map((address) => ({
    ...address,
    _id: address._id.toString(),
  }));
};

export const newAddress = async (data) => {
  if (!data) {
    return { success: false, error: "সকল ইনফর্মেশন পাওয়া যাইনি" };
  }

  const session = await getServerSession();

  await connectToDB();
  const newAddress = AddressModel({ ...data, author: session.user.email });
  const address = await newAddress.save();
  if (!address._id) {
    return {
      success: false,
      error: "দুঃখিত কিছু সময় পর পুনরাই আবার চেষ্টা করুন",
    };
  }
  return { success: true, msg: "ঠিকানা সফল ভাবে যুক্ত হয়েছে" };
};

export const deleteAddress = async (addressId, author) => {
  const session = await getServerSession();
  console.log(author);
  if (session?.user?.email !== author) {
    return { success: false, error: "দুঃখিত অননুমোদিত ইউসার " };
  }

  if (!addressId) {
    return { success: false, error: "দুঃখিত ঠিকানা id বাধ্যতামূলক" };
  }

  await connectToDB();
  const deleteAddress = await AddressModel.findByIdAndDelete(addressId);
  return { success: true, msg: "ঠিকানাটি সফল ভাবে ডিলিট হয়েছে" };
};
