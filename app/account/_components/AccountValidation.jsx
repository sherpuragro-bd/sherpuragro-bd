"use client";

import { sendOtp, verifyAccount } from "@/actions/auth";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import OtpSVGURI from "../../../public/img/otp.svg";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, X } from "lucide-react";
import OtpTimeCountDown from "./OtpTimeCountDown";
import { useRouter } from "next/navigation";

export default function AccountValidation() {
  const router = useRouter();
  const [isSendingOtp, setisSendingOtp] = useState(false);
  const [otpValidPopop, setotpValidPopop] = useState(false);
  const [otp, setotp] = useState();
  const [exps, setexps] = useState();
  const [resendingOtp, setresendingOtp] = useState(false);
  const countdownRef = useRef();

  const otpLength = otp?.length || 0;

  const handelNewOtp = async () => {
    setisSendingOtp(true);
    const res = await sendOtp();
    if (!res.success) {
      if (res?.valid) {
        setotpValidPopop(true);
        setexps(res.exps);
      } else {
        toast.error(res.error);
      }
      setisSendingOtp(false);
      return;
    }

    toast.success(res.msg);
    setisSendingOtp(false);
    setexps(res.exps);
    setotpValidPopop(true);
  };

  const handelResendOtp = async () => {
    const res = await sendOtp();
    if (res.success) {
      countdownRef.current.resetCountdown();
      setexps(res.exps);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (otpLength < 6) {
      return;
    }

    const res = await verifyAccount(parseInt(otp));
    if (!res.success) {
      toast.error(res.error);
      return;
    }
    router.refresh();
    toast.success(res.msg);
  };

  return (
    <>
      {otpValidPopop && (
        <>
          <section className="w-full [&::-webkit-scrollbar]:w-2 flex overflow-y-scroll fixed z-[999999999] items-center justify-center bg-black/40 h-screen py-40 top-0">
            <div className="bg-white flex flex-col gap-3 p-5 w-10/12 md:w-[350px] rounded-xl border border-primary/20">
              <div className="w-full flex justify-end -mb-10 z-20">
                <button onClick={() => setotpValidPopop(false)}>
                  <X />
                </button>
              </div>
              <div className="flex flex-wrap">
                <Image
                  width={70}
                  className="-ml-2"
                  src={OtpSVGURI}
                  alt="Otp Valid Image"
                />
                <div className="pt-2">
                  <h2 className="text-xl">ভ্যালিড ওটিপি লিখুন </h2>
                  <p className="font-light">
                    ওটিপি টি আপনার ইমেইল অ্যাকাউন্ট এ মেইল করা হয়েছে{" "}
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleOtpVerification}
                className="w-full font-en font-bold"
              >
                <InputOTP onChange={setotp} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="flex items-center -mb-1 pt-3">
                  <OtpTimeCountDown
                    ref={countdownRef}
                    resendEvent={handelNewOtp}
                    remaining={exps}
                  >
                    <button
                      type="button"
                      onClick={handelResendOtp}
                      className="font-bn flex gap-2 items-center font-normal text-primary underline"
                    >
                      রিসেন্ড ওটিপি
                    </button>
                  </OtpTimeCountDown>
                </div>
                <button
                  type="submit"
                  disabled={otpLength < 6}
                  className={`font-bn font-extralight px-5 py-1 mt-5 bg-gradient-to-br w-full text-center from-primary to-primary/60 border border-primary text-white/100 rounded-md hover:opacity-90 transition-all ${
                    otpLength < 6 && "cursor-not-allowed opacity-80"
                  }`}
                >
                  ভেরিফাই করুন{" "}
                </button>
              </form>
            </div>
          </section>
        </>
      )}
      <section className="flex justify-center w-full bg-gradient-to-br from-primary to-primary/80 py-2">
        <div className="w-full max-w-primary gap-3 items-center flex-wrap px-5 flex justify-center">
          <p className="md:text-base text-sm text-green-50 min-[580px]:flex gap-3">
            কোনো পণ্য অর্ডার করার আগে অনুগ্রহ করে আপনার অ্যাকাউন্টটি ভেরিফাই
            করুন{" "}
            <button
              disabled={isSendingOtp}
              onClick={handelNewOtp}
              className={`bg-white w-fit flex items-center gap-2 hover:bg-gray-200 text-primary px-5 rounded-sm ${
                isSendingOtp && "cursor-not-allowed"
              }`}
            >
              ওটিপি পাঠান{" "}
              {isSendingOtp && <Loader2 size={18} className="animate-spin" />}
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
