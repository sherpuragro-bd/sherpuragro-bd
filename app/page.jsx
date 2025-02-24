"use client";

import Image from "next/image";
import ConstructionImageURI from ".././public/img/webconstruction.png";
import Br from "./components/ui/Br";
import { LinkHighLight } from "./components/ui/LinkHighLight";
import Link from "next/link";
import { useEffect, useState } from "react";
import { convertToBengaliNumbers } from "@/lib/utils";

export default function Page() {
  const targetTime = new Date("2025-04-04T18:00:00").getTime();

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const diff = targetTime - currentTime;

      if (diff <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <>
      <section className="flex justify-center w-full">
        <div className="w-full max-w-primary px-5 py-20 pb-40 flex flex-col items-center justify-center">
          <Image src={ConstructionImageURI} alt="Construction" />
          <div>
            <h2 className="text-2xl text-center">
              আপনাকে <LinkHighLight href="/">শেরপুর এগ্রোতে</LinkHighLight>{" "}
              স্বাগতম। আমাদের ওয়েবসাইট এর কাজ চলমান রয়েছে ।<Br /> ইনশাআল্লাহ
              আগামি মাসের মধ্যে আমাদের কাজ সম্পূর্ণ হবে, ততক্ষণ <Br /> আপনি
              আমাদের{" "}
              <Link
                className="text-blue-600 hover:underline"
                href="https://www.facebook.com/sherpuragrobd"
              >
                ফেসবুক পেজ{" "}
              </Link>{" "}
              ফলো করতে পারেন । ধন্যবাদ
            </h2>
            <div className="text-xl justify-center text-center mt-5 flex flex-wrap items-center gap-5 ">
              <p className="px-5 !text-text py-2  border rounded-md">
                {convertToBengaliNumbers(timeRemaining.days)} দিন
              </p>
              <p className="px-5 !text-text py-2 border rounded-md">
                {convertToBengaliNumbers(timeRemaining.hours)} ঘণ্টা
              </p>
              <p className="px-5 !text-text py-2  border rounded-md">
                {convertToBengaliNumbers(timeRemaining.minutes)} মিনিট
              </p>
              <p className="px-5 !text-text py-2 border-primary border rounded-md">
                {convertToBengaliNumbers(timeRemaining.seconds)} সেকেন্ড
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
