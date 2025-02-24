"use client";

import { socialSignIn } from "@/actions/socialSignIn";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SocialLogin() {
  const handleGoogleSignIn = async (method) => {
    try {
      if (method === "google") {
        await socialSignIn({ method: "google", callBack: "/account" });
      } else if (method === "facebook") {
        await socialSignIn({ method: "facebook", callBack: "/account" });
      } else {
        return;
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-3 sm:flex-nowrap">
      <button
        onClick={() => handleGoogleSignIn("google")}
        type="button"
        className="bg-white flex gap-5 justify-center border hover:bg-stone-100 focus-within:ring-1 ring-offset-2 ring-primary/50 focus-within:border-transparent rounded-md focus-within:-translate-y-1  hover:shadow-xl hover:shadow-primary/10 transition-all px-5 py-2 w-full"
      >
        <FcGoogle size={20} />
        <span>গুগল </span>
      </button>
      <button
        onClick={() => handleGoogleSignIn("facebook")}
        type="button"
        className="bg-white justify-center flex gap-5 border hover:bg-stone-100 focus-within:ring-1 ring-offset-2 ring-primary/50 focus-within:border-transparent rounded-md  focus-within:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all px-5 py-2 w-full"
      >
        <FaFacebook color="#4267B2" size={20} />
        <span>ফেসবুক</span>
      </button>
    </div>
  );
}
