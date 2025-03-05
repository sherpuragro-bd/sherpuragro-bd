"use client";
import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RgbaColorPicker } from "react-colorful";

const ColorPicker = forwardRef(({ windowLoaded, className, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className || ""}`}>
      <label className="font-light">
        ব্যাকগ্রাউন্ড কালার <span className="text-orange-600 text-sm">*</span>
      </label>
      {windowLoaded ? (
        <RgbaColorPicker ref={ref} {...props} />
      ) : (
        <Skeleton className="w-[200px] h-[200px]" />
      )}
    </div>
  );
});

export default ColorPicker;
