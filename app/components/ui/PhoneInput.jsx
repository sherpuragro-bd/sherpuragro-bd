"use client";

import React from "react";
import { Input } from "./Input";

export const PhoneInput = ({
  number,
  setNumber,
  className,
  children,
  ...props
}) => {
  const handleNumber = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,11}$/.test(newValue)) {
      setNumber(newValue);
    }
  };

  return (
    <Input
      onChange={handleNumber}
      icon={
        <svg width={23} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#006A4D"
            d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
          />
          <circle fill="#F42A41" cx={16} cy="17.5" r={7} />
        </svg>
      }
      value={number || ""}
      type="number"
      {...props}
    >
      {children}
    </Input>
  );
};
