"use client";

import { newsletterSubscribeAction } from "@/actions/user";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubscribeNewsletter() {
  const [subscribing, setsubscribing] = useState();

  const handelSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) {
      return;
    }
    setsubscribing(true);
    const res = await newsletterSubscribeAction(email);
    e.target.reset();
    setsubscribing(false);
    if (res?.error) {
      return toast.error(res.error);
    }
    toast.success(res.msg);
  };

  return (
    <form
      onSubmit={handelSubscribe}
      className="mt-10 w-full md:w-8/12 min-[1000px]:w-6/12 pl-5 flex items-center gap-5 rounded-full overflow-hidden bg-white"
    >
      <Mail size={40} className="opacity-60" strokeWidth={1.4} />
      <input
        required
        name="email"
        type="email"
        className="w-full py-3 placeholder:font-light font-light"
        placeholder="আপনার ইমেইল লিখুন"
      />
      <button className="px-8 py-3 rounded-full bg-gradient-to-br border-2 border-primary to-primary from-primary/60 text-white font-light">
        {subscribing ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          "সাবস্ক্রাইব"
        )}
      </button>
    </form>
  );
}
