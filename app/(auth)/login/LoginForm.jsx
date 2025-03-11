"use client";

import { loginUser } from "@/actions/auth/login";
import { Input, InputPass } from "@/app/components/ui/Input";
import LineErro from "@/app/components/ui/LineErro";
import NewLink from "@/app/components/ui/NewLink";
import SocialLogin from "@/app/components/ui/SocialLogin";
import { Loader2, Lock, LockIcon, Mail, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();
  const [isLogining, setIsLogining] = useState(false);

  const {
    register: login,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelLogin = async (data) => {
    setIsLogining(true);
    const res = await loginUser(data);

    if (res.success) {
      toast.success("লগইন সফল হয়েছে");
      router.refresh();
      return;
    } else {
      reset(),
        Swal.fire({
          icon: "error",
          title: "লগইন ব্যর্থ হয়েছে",
          text: res.error,
          confirmButtonText: "ঠিক আছে",
          showCancelButton: true,
          cancelButtonText: "যোগাযোগ করুন",
        }).then((res) => {
          if (!res.isConfirmed) {
            router.push("/contact");
          }
        });
    }
    setIsLogining(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handelLogin)}
      className="w-full md:w-9/12 xl:w-[500px] border border-primary/20 p-7 rounded-xl bg-primary/5"
    >
      <div className="flex gap-5 max-[400px]:flex-col">
        <LockIcon
          className="p-2 bg-white border text-primary rounded-md border-gray-300/50"
          size={45}
          strokeWidth={1}
        />
        <div className="w-10/12">
          <h2 className="text-xl">লগইন করুন</h2>
          <p className="text-sm pt-1 text-neutral-500 font-thin">
            আপনার ব্যক্তিগত তথ্য এই ওয়েবসাইট জুড়ে আপনার অভিজ্ঞতা সমর্থন করতে,
            আপনার অ্যাকাউন্টে অ্যাক্সেস পরিচালনা করতে ব্যবহার করা হবে।
          </p>
        </div>
      </div>
      <div className="w-full pt-5 space-y-7">
        <Input
          disabled={isLogining}
          required={true}
          {...login("email", { required: true })}
          icon={<Mail strokeWidth={0.75} />}
          type="email"
          placeholder="ইমেইল এড্রেস"
          label="ইমেইল"
        />
        {errors.email && <LineErro>সঠিক ইমেইল লিখুন</LineErro>}

        <InputPass
          disabled={isLogining}
          required={true}
          {...login("password", { required: true })}
          icon={<Lock strokeWidth={0.75} />}
          placeholder="একটি কঠিন পাসওয়ার্ড লিখুন"
          label="পাসওয়ার্ড"
        >
          {errors.password && <LineErro>পাসওয়ার্ড লিখুন</LineErro>}
        </InputPass>
      </div>

      <button
        disabled={isLogining}
        className={`bg-primary/80 hover:bg-primary transition-all group flex justify-center items-center gap-2 text-white px-5 w-full py-2 font-extralight rounded-md border border-primary mt-5 ${
          isLogining && "cursor-not-allowed"
        }`}
      >
        {isLogining ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            লগইন
            <MoveRight
              className="-ml-10 opacity-0 group-hover:translate-x-10 transition-all group-hover:!opacity-100"
              strokeWidth={0.75}
            />
          </>
        )}
      </button>
      <br />
      <p className="font-extralight text-center text-neutral-500/70 w-full">
        আপনার কোনো অ্যাকাউন্ট নেই ?{" "}
        <NewLink href={`/register`} className="text-primary underline">
          রেজিস্ট্রেশন করুন
        </NewLink>
      </p>
      <br />
      <hr />
      <br />
      <SocialLogin />
    </form>
  );
}
