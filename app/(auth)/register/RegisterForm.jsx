"use client";

import { registerUser } from "@/actions/auth/auth";
import { Input, InputPass } from "@/app/components/ui/Input";
import LineErro from "@/app/components/ui/LineErro";
import SocialLogin from "@/app/components/ui/SocialLogin";
import { Loader2, Lock, Mail, MoveRight, User, UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [number, setNumber] = useState("");
  const [isRegistering, setIsRegistering] = useState();

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,11}$/.test(newValue)) {
      setNumber(newValue);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { name, email, phone, password, terms } = data;

    if (isRegistering) {
      return;
    }

    if (!name) {
      return toast.error("আপনার নাম লিখুন");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return toast.error("সঠিক ইমেইল লিখুন");
    }

    if (phone.length !== 11) {
      return toast.error("ফোন নাম্বার ১১ ডিজিট হতে হবে");
    }

    if (password.length < 6) {
      return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    }

    if (!terms) {
      return toast.error("শর্তাবলীতে সম্মতি দিন");
    }

    setIsRegistering(true);

    const res = await registerUser(data);

    if (!res.success) {
      setIsRegistering(false);
      return toast.error(res.error);
    }

    toast.success("অভিনন্দন রেজিস্ট্রেশন সফল হয়েছে");
    await signIn("credentials", { email, password, callbackUrl: "/account" });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="w-full sm:w-8/12 md:w-7/12 xl:w-[500px] border border-primary/20 p-7 rounded-xl bg-primary/5"
    >
      <div className="flex gap-5 max-[400px]:flex-col">
        <UserPlus
          className="p-2 bg-white border text-primary rounded-md border-gray-300/50"
          size={45}
          strokeWidth={1}
        />
        <div className="w-10/12">
          <h2 className="text-xl">রেজিস্ট্রেশন করুন</h2>
          <p className="text-sm pt-1 text-neutral-500 font-thin">
            রেজিস্ট্রেশন ফর্মের সমস্ত তথ্য পূরণ করুন এবং আপনার কিছু ব্যক্তিগত
            তথ্য প্রদান করুন।
          </p>
        </div>
      </div>
      <div className="w-full pt-5 space-y-7">
        <Input
          disabled={isRegistering}
          {...register("name", { required: true })}
          icon={<User strokeWidth={0.75} />}
          required={true}
          placeholder="আপনার নাম"
          label="নাম"
          type="text"
        />
        {errors.name && <LineErro>নাম প্রয়োজন</LineErro>}

        <Input
          disabled={isRegistering}
          required={true}
          {...register("email", { required: true })}
          icon={<Mail strokeWidth={0.75} />}
          type="email"
          placeholder="ইমেইল এড্রেস"
          label="ইমেইল"
        />
        {errors.email && <LineErro>সঠিক ইমেইল লিখুন</LineErro>}

        <Input
          disabled={isRegistering}
          required={true}
          {...register("phone", { required: true })}
          icon={
            <svg
              width={23}
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#006A4D"
                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
              />
              <circle fill="#F42A41" cx={16} cy="17.5" r={7} />
            </svg>
          }
          onChange={handleChange}
          value={number}
          type="number"
          placeholder="০১৭XXXXXXXX"
          label="ফোন নাম্বার"
        />
        {errors.phone && <LineErro>ফোন নাম্বার ১১ ডিজিট হতে হবে</LineErro>}

        <InputPass
          autoComplete="new-password"
          disabled={isRegistering}
          required={true}
          {...register("password", { required: true })}
          icon={<Lock strokeWidth={0.75} />}
          placeholder="একটি কঠিন পাসওয়ার্ড লিখুন"
          label="পাসওয়ার্ড"
        >
          {errors.password && (
            <LineErro>পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে</LineErro>
          )}
        </InputPass>

        <div className="flex items-center -translate-y-2">
          <input
            {...register("terms", { required: true })}
            type="checkbox"
            id="terms"
          />
          <label htmlFor="terms" className="ml-2">
            আমি শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত।
          </label>
        </div>
        {errors.terms && <LineErro>শর্তাবলীতে সম্মতি দিন</LineErro>}
      </div>

      <button
        disabled={isRegistering}
        className={`bg-primary/80 hover:bg-primary transition-all group flex justify-center items-center gap-2 text-white px-5 w-full py-2 font-extralight rounded-md border border-primary mt-5 ${
          isRegistering && "cursor-not-allowed"
        }`}
      >
        {isRegistering ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            রেজিস্ট্রেশন
            <MoveRight
              className="-ml-10 opacity-0 group-hover:translate-x-10 transition-all group-hover:!opacity-100"
              strokeWidth={0.75}
            />
          </>
        )}
      </button>
      <br />
      <p className="font-extralight text-center text-neutral-500/70 w-full">
        ইতিমধ্যে আপনার অ্যাকাউন্ট রয়েছে?{" "}
        <Link href={`/login`} className="text-primary underline">
          লগইন করুন
        </Link>
      </p>
      <br />
      <hr />
      <br />
      <SocialLogin />
    </form>
  );
}
