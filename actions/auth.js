"use server";

import { connectToDB } from "@/lib/connectToDB";
import { userModel } from "@/models/user.model";
import bcrypt from "bcrypt";

export const registerUser = async (user) => {
  // Extract user details from the input
  const { email, name, phone, password } = user;

  // Validate user details
  if (!user || !email || !password || !phone || !name) {
    return { success: false, error: "ব্যবহারকারী খুঁজে পাওয়া যায়নি" };
  }

  // Connect to the database
  await connectToDB();

  // Check if the user already exists
  const isExistUser = await userModel.findOne({ email: email });
  if (isExistUser) {
    return { success: false, error: "অ্যাকাউন্ট ইতিমধ্যেই আছে" };
  }

  // Genaret Hash Password
  const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds
  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = userModel({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  if (!savedUser?._id) {
    return { success: false, error: "দুঃখিত একটু পর আবার চেষ্টা করুন" };
  }
  return { success: true, message: "অভিনন্দন রেজিস্ট্রেশন সম্পূর্ণ হয়েছে" };
};
