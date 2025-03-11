"use client";

import { Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiShoppingCartThin } from "react-icons/pi";
import { Search } from "lucide-react";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import NewLink from "../ui/NewLink";

export default function Bar({ user, session }) {
  const pathname = usePathname();
  return (
    <>
      <div className="grid grid-cols-5 gap-5">
        <IconBars icon={<Home strokeWidth={1} />} href={`/`}>
          হোম
        </IconBars>
        <IconBars icon={<ShoppingBag strokeWidth={1} />} href={`/products`}>
          কিনুন
        </IconBars>
        <IconBars
          icon={
            <>
              <div className="-mt-4">
                <span className="font-en bg-primary z-10 relative text-white scale-75 font-medium p-1 -mb-3 translate-x-3 translate-y-1 justify-center items-center flex rounded-full text-sm">
                  0
                </span>
                <PiShoppingCartThin className="opacity-60" size={28} />
              </div>
            </>
          }
          href={`/cart`}
        >
          কার্ট
        </IconBars>
        <button
          className={`flex flex-col justify-center rounded items-center gap-1 p-3 `}
        >
          <span>
            <Search strokeWidth={1} size={28} />
          </span>
          <span className="max-[350px]:hidden">সার্চ</span>
        </button>
        <NewLink
          href={"/account" || `/`}
          className={`flex flex-col justify-center rounded items-center gap-1 p-3  ${
            pathname === "/account" ? "text-primary transition-all" : ""
          }`}
        >
          {session ? (
            <Image
              src={
                session?.image ||
                user?.image ||
                `/api/og/avatar?avatar=${user?.name?.slice(0, 1)}`
              }
              width={30}
              className="object-cover min-w-[23px] rounded-full"
              height={30}
              alt={user?.name || "Avatar"}
            />
          ) : (
            <CiUser className="opacity-60" size={28} />
          )}
          <span className="max-[350px]:hidden">অ্যাকাউন্ট</span>
        </NewLink>
      </div>
    </>
  );
}

const IconBars = ({ href, icon, children }) => {
  const pathname = usePathname();

  return (
    <NewLink
      href={href || `/`}
      className={`flex flex-col justify-center rounded items-center gap-1 p-3  ${
        href === pathname ? "text-primary transition-all" : ""
      }`}
    >
      <span>{icon}</span>
      <span className="max-[350px]:hidden">{children}</span>
    </NewLink>
  );
};
