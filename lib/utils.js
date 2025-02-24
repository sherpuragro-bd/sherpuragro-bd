import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BookOpenText,
  Boxes,
  Folder,
  GalleryVertical,
  Layers,
  LayoutGrid,
  Mail,
  PackageOpen,
  Settings2,
  Store,
  Users,
} from "lucide-react";

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

export const adminNavData = {
  navMain: [
    {
      title: "ড্যাশবোর্ড",
      icon: LayoutGrid,
      activePathName: "/admin",
      url: "/",
    },
    {
      title: "হোম স্লাইডার ",
      icon: GalleryVertical,
      url: "/sliders",
    },
    {
      title: "দোকান",
      icon: Store,
      url: "/shop",
      items: [
        {
          title: "প্রোডাক্টস ক্যাটাগরি",
          icon: PackageOpen,
          url: "/shop/categories",
        },
      ],
    },
    {
      title: "ইউসারস",
      icon: Users,
      url: "/users",
    },
    {
      title: "ব্লগস",
      icon: BookOpenText,
      url: "/blogs",
    },
    {
      title: "পেজেস",
      icon: Layers,
      url: "/pages",
    },
    {
      title: "কন্টাক্টস",
      icon: Mail,
      url: "/contacts",
    },
    {
      title: "মিডিয়া",
      icon: Folder,
      url: "/media",
    },
    {
      title: "সেটিং",
      icon: Settings2,
      url: "/settings",
    },
  ],
};

export const convertToBengaliNumbers = (number) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
};
