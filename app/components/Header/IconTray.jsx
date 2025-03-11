"use client";

import Link from "next/link";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  LogIn,
  LogOut,
  MapPin,
  SlidersHorizontal,
  Table2,
  User,
  UserPlus,
} from "lucide-react";
import { logoutUser } from "@/actions/auth/login";
import NewLink from "../ui/NewLink";

export default function IconTray({ user, avatar, userData }) {
  return (
    <>
      <div className="flex items-center gap-5">
        <Compare />
        <Cart />
        <Account userData={userData} avatar={avatar} user={user} />
      </div>
    </>
  );
}

const Compare = ({ count = 0 }) => {
  return (
    <NewLink href={"/compare"} className="flex items-end gap-2">
      <div>
        <span className="font-en bg-primary text-white scale-75 font-medium p-1 -mb-3 translate-x-2 justify-center items-center flex rounded-full text-sm">
          {count}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-git-compare"
        >
          <circle cx={18} cy={18} r={3} />
          <circle cx={6} cy={6} r={3} />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <path d="M11 18H8a2 2 0 0 1-2-2V9" />
        </svg>
      </div>
      <span className="font-light hidden sm:block">তুলনা</span>
    </NewLink>
  );
};

export const Cart = ({ count = 0 }) => {
  return (
    <NewLink href={"/cart"} className="flex items-end gap-2">
      <div>
        <span className="font-en bg-primary z-10 relative text-white scale-75 font-medium p-1 -mb-3 translate-x-2 justify-center items-center flex rounded-full text-sm">
          {count}
        </span>
        <PiShoppingCartThin className="opacity-60" size={28} />
      </div>
      <span className="font-light hidden sm:block">কার্ট</span>
    </NewLink>
  );
};

const Account = ({ user, avatar, userData }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="items-end gap-2 cursor-pointer hidden md:flex">
            <div className="pt-3 w-7">
              {user ? (
                <>
                  <Image
                    src={
                      avatar ||
                      user?.image ||
                      `/api/og/avatar?avatar=${user?.name?.slice(0, 1)}`
                    }
                    width={30}
                    className="object-cover rounded-full"
                    height={30}
                    alt={user?.name || "Avatar"}
                  />
                </>
              ) : (
                <CiUser className="opacity-60" size={28} />
              )}
            </div>
            <span className="font-light hidden sm:block w-20 text-start !overflow-hidden">
              {userData?.name
                ? userData.name.length > 8
                  ? userData.name.slice(0, 8) + "..."
                  : userData.name
                : user?.name
                ? user.name.length > 8
                  ? user.name.slice(0, 8) + "..."
                  : user.name
                : "অ্যাকাউন্ট"}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-none mt-3 flex flex-col z-[99999999999999999999] text-sm font-light gap-2 text-1/80 xl:mr-0 mr-5 w-[160px] border border-gray-300">
          {user ? (
            <>
              {userData?.role === "admin" && (
                <NewLink href={`/admin`} className="flex gap-3 hover:underline">
                  <Table2 size={20} strokeWidth={1} /> এডমিন প্যানেল
                </NewLink>
              )}
              <NewLink href={`/account`} className="flex gap-3 hover:underline">
                <User size={20} strokeWidth={1} /> অ্যাকাউন্ট
              </NewLink>
              <NewLink
                href={`/order-tracking`}
                className="flex gap-3 hover:underline"
              >
                <MapPin size={18} strokeWidth={0.8} /> অর্ডার ট্র্যাকিং
              </NewLink>
              <NewLink
                href={`/account/edit-account`}
                className="flex gap-3 hover:underline"
              >
                <SlidersHorizontal size={18} strokeWidth={0.8} /> আপডেট প্রোফাইল
              </NewLink>
              <button
                onClick={async () => await logoutUser()}
                className="flex gap-3 hover:underline"
              >
                <LogOut strokeWidth={1} size={19} className="rotate-180" />
                লগআউট
              </button>
            </>
          ) : (
            <>
              <NewLink href={`/login`} className="flex gap-3 hover:underline">
                <LogIn size={20} strokeWidth={1} /> লগইন
              </NewLink>
              <NewLink
                className="flex gap-3 hover:underline"
                href={`/register`}
              >
                <UserPlus size={20} strokeWidth={1} />
                রেজিস্ট্রেশন
              </NewLink>
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
