import { signIn, signOut } from "next-auth/react";
import { logout } from "./logout";

export const loginUser = async (data) => {
  const { email, password } = data;

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    return { success: false, error: "ভুল লগইন তথ্য" };
  }

  return { success: true, msg: "লগইন সফল হয়েছে" };
};

export const logoutUser = async () => {
  await logout();
  await signOut();
};
