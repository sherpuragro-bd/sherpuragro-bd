"use client";

import { Eye, EyeClosed } from "lucide-react";
import React, { forwardRef, useState } from "react";

export const Input = forwardRef(
  ({ icon, required, label, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-light">
            {label}{" "}
            {required && <span className="text-orange-600 text-sm">*</span>}
          </label>
        )}
        <input
          className="px-5 font-extralight rounded-md py-[6px] pl-9 focus:bg-neutral-300/20 placeholder:font-extralight border border-gray-300/50 focus:border-primary/50 transition-all bg-white/80"
          ref={ref}
          {...props}
        />
        <span className="-mt-10 w-fit scale-[0.8] ml-2">{icon}</span>
        <span className="-mt-4">{children}</span>
      </div>
    );
  }
);

export const InputPass = forwardRef(
  ({ icon, required, label, children, ...props }, ref) => {
    const [isPasswordOpen, setisPasswordOpen] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-light">
            {label}{" "}
            {required && <span className="text-orange-600 text-sm">*</span>}
          </label>
        )}
        <input
          type={!isPasswordOpen ? "password" : "text"}
          className="px-5 font-extralight rounded-md py-[6px] pl-9 focus:bg-neutral-300/20 placeholder:font-extralight border border-gray-300/50 focus:border-primary/50 transition-all bg-white/80"
          ref={ref}
          {...props}
        />
        <div className="flex justify-between w-full">
          <span className="-mt-10 w-fit scale-[0.8] ml-2">{icon}</span>
          <button
            onClick={() => setisPasswordOpen(!isPasswordOpen)}
            type="button"
            className="w-fit -mt-14 mr-2 "
          >
            {!isPasswordOpen ? (
              <>
                <Eye strokeWidth={0.8} size={20} />
              </>
            ) : (
              <>
                <EyeClosed strokeWidth={0.8} size={20} />
              </>
            )}
          </button>
        </div>
        {children}
      </div>
    );
  }
);
