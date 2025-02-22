import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const guideStyleOption = {
  options: { zIndex: 999999 },
  tooltip: {
    boxShadow: "none",
    borderRadius: "10px",
    border: "1px solid #0eb77e52",
  },
  buttonNext: {
    background: "#0eb77e",
  },
  buttonBack: {
    color: "#253d4e",
  },
  spotlight: {
    borderRadius: "10px",
    border: "1px solid #0eb77e52",
  },
};
