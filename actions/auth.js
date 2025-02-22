"use server";

import { connectToDB } from "@/lib/connectToDB";
import { userModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { createSecretKey } from "crypto";
import { EncryptJWT, jwtDecrypt } from "jose";
import { cookies } from "next/headers";
import { mailer } from "@/lib/sendMail";
import { emailTemplate } from "@/templates/email";

export const registerUser = async (user) => {
  // Extract user details from the input
  const { email, name, phone, password, isActive } = user;

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
    ...(isActive !== undefined && { isActive }),
  });

  const savedUser = await newUser.save();
  if (!savedUser?._id) {
    return { success: false, error: "দুঃখিত একটু পর আবার চেষ্টা করুন" };
  }
  return { success: true, message: "অভিনন্দন রেজিস্ট্রেশন সম্পূর্ণ হয়েছে" };
};

// Send Otp
export const sendOtp = async () => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return { success: false, error: "অননুমোদিত ব্যবহারকারী" };
  }

  const cookiesStore = await cookies();
  const prevOtpToken = cookiesStore.get("otp_Secure_Token")?.value;
  const secret = createSecretKey(Buffer.from(process.env.JOSE_SECRET, "utf-8"));

  if (prevOtpToken) {
    try {
      const { payload } = await jwtDecrypt(prevOtpToken, secret);
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = payload.exp - currentTime;
      return {
        success: false,
        valid: true,
        exps: expiresIn,
      };
    } catch (error) {}
  }

  const otp = Math.floor(Math.random() * 900000) + 100000;
  const tokenPayload = {
    otp,
    email: session.user.email,
  };

  const otp_token = await new EncryptJWT(tokenPayload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .encrypt(secret);

  cookiesStore.set("otp_Secure_Token", otp_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 5,
  });

  await mailer.sendMail({
    from: '"শেরপুর এগ্রো" <auth@sherpuragro.com>',
    to: session.user.email,
    subject: "শেরপুর এগ্রো অ্যাকাউন্ট ভেরিফিকেশন ওটিপি  ",
    html: emailTemplate(`
      <h1>${session.user.name} আপনার অ্যাকাউন্ট ভেরিফিকেশন কোড </h1>
      <br />
      <h1>${otp}</h1>
    `),
  });

  return { success: true, msg: "ওটিপি আপনার ইমেইল এ পাঠানো হয়েছে", exps: 300 };
};

export const verifyAccount = async (otpReq) => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return { success: false, error: "অননুমোদিত ব্যবহারকারী" };
  }

  const cookiesStore = await cookies();
  const otpToken = cookiesStore.get("otp_Secure_Token")?.value;
  const secret = createSecretKey(Buffer.from(process.env.JOSE_SECRET, "utf-8"));

  if (!otpToken) {
    return { success: false, error: "দুঃখিত কিছু সময় পর চেষ্টা করুন " };
  }

  try {
    const { payload } = await jwtDecrypt(otpToken, secret);
    if (payload.otp !== parseInt(otpReq)) {
      return { success: false, error: "দুঃখিত সঠিক ওটিপি লিখুন" };
    }
    const activeAccount = await userModel.findOneAndUpdate(
      { email: session.user.email },
      { $set: { isActive: true } }
    );
    cookiesStore.delete("otp_Secure_Token");
    return { success: true, msg: "অ্যাকাউন্ট এক্টিভেশন সফল হয়েছে " };
  } catch (err) {
    return { success: false, error: "দুঃখিত সঠিক ওটিপি লিখুন " };
  }
};
