"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import CountUp from "react-countup";

const OtpTimeCountDown = forwardRef(({ remaining, children }, ref) => {
  const [remainingTime, setRemainingTime] = useState(remaining);
  const [counting, setCounting] = useState(true);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCounting(false);
    }
  }, [remainingTime]);

  useImperativeHandle(ref, () => ({
    resetCountdown: () => {
      setRemainingTime(remaining);
      setCounting(true);
    },
  }));

  return (
    <div>
      {counting ? (
        <>
          <CountUp
            start={remainingTime}
            end={0}
            duration={remainingTime}
            useEasing={false}
          />
          <span className="font-bn font-normal"> সেকেন্ড বাকি </span>
        </>
      ) : (
        children
      )}
    </div>
  );
});

export default OtpTimeCountDown;
