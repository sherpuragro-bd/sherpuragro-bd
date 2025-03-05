"use client";

import { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PublicitySelect = forwardRef(
  ({ className, label, defaultItem = true, children, ...props }, ref) => {
    return (
      <>
        <div className="flex flex-col gap-2 w-full">
          {label && (
            <label className="font-light">
              স্ট্যাটাস <span className="text-orange-600 text-sm">*</span>
            </label>
          )}
          <Select ref={ref} defaultValue="public" {...props}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="স্ট্যাটাস বেছে নিন" />
            </SelectTrigger>
            <SelectContent>
              {defaultItem && (
                <>
                  <SelectItem value="public">পাবলিশড</SelectItem>
                  <SelectItem value="draft">ড্রাফট</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </>
    );
  }
);
