import { signIn } from "next-auth/react";

export const socialSignIn = async ({ method, callBack }) => {
  if (method === "google") {
    const result = await signIn("google", { callbackUrl: callBack || "/" });

    if (result?.error) {
      throw new Error(result.error);
    }
    return result;
  } else if (method === "facebook") {
    const result = await signIn("facebook", { callbackUrl: callBack || "/" });

    if (result?.error) {
      throw new Error(result.error);
    }
    return result;
  }
};
