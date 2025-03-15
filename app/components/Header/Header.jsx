import Link from "next/link";
import Search from "./Search";
import IconTray from "./IconTray";
import { getServerSession } from "next-auth";
import LogoURI from "../../../public/img/logo.png";
import SmLogoURI from "../../../public/img/small-logo.png";
import Image from "next/image";
import { getUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import BrowserAllCetegories from "./BrowserCategories/BrowserAllCetegories";
import { HeaderData, HeaderDefaultNavs } from "@/data/Header";
import { convertToBengaliNumbers } from "@/lib/utils";
import { ChevronDown, Headset } from "lucide-react";
import NavLink from "../ui/NavLink";
import HeaderCategoryDropdown from "./HeaderCategoryDropdown";
import { Suspense } from "react";
import MobileDropdown from "./MobileDropdown";

export default async function Header() {
  const session = await getServerSession();
  const user = await getUser();

  return (
    <>
      {user?.role === "admin" && (
        <section className="w-full py-1 bg-adminBg items-center px-5 flex justify-between">
          <Link className="flex" href={`/admin`}>
            <Image
              width={40}
              className="max-[350px]:hidden scale-75"
              src={SmLogoURI}
              alt="Logo"
            />
            <span className="text-2xl text-primary font-medium">
              শেরপুর{" "}
              <span className="text-white font-normal">
                এগ্রো{" "}
                <span className="font-extralight text-xl underline">এডমিন</span>
              </span>
            </span>
          </Link>
          <p className="text-white/80 font-extralight max-[800px]:hidden">
            আপনি শেরপুর এগ্রো এডমিন একসেস রয়েছে আপনি ছাইলে এডমিন প্যানেল এ জেতে
            পারেন
          </p>
          <Link href={`/admin`}>
            <Button className="bg-white text-black h-7 hover:bg-primary">
              এডমিন
            </Button>
          </Link>
        </section>
      )}
      <header className="flex justify-center items-center border-b z-[999] bg-white relative flex-col w-full">
        <div className="w-full items-center gap-5 max-w-primary p-5 py-6 inline-flex justify-between">
          <div className="flex items-center gap-10 xl:gap-20 w-full">
            <Link href="/" className="text-3xl">
              <Image
                width={180}
                src={LogoURI}
                className="max-[350px]:hidden"
                alt="Sherpur Agro Logo"
              />
              <Image
                width={40}
                src={SmLogoURI}
                className="min-[350px]:hidden"
                alt="Sherpur Agro Logo"
              />
            </Link>
            <Search />
          </div>
          <div className="max-[460px]:hidden -mt-3 md:mt-0">
            <IconTray
              userData={{ ...user, _id: `${user?._id}` }}
              avatar={user?.image}
              user={session?.user}
            />
          </div>
          <MobileDropdown className="md:hidden " />
        </div>
        <div className="border-t hidden justify-center w-full py-2 md:flex">
          <div className="max-w-primary w-full flex px-5 justify-between">
            <div className="flex items-center gap-10">
              <BrowserAllCetegories />
              <ul className="hidden lg:flex items-center gap-10 ">
                {HeaderDefaultNavs.map((nav, index) => (
                  <li key={`nav-${index}`} className={`order-0`}>
                    <NavLink
                      className={`hover:text-primary hover:underline`}
                      href={nav.path}
                    >
                      {nav.pathName}
                    </NavLink>
                  </li>
                ))}
                <li className="flex order-3 items-center gap-1 cursor-pointer group">
                  ক্যাটেগরিস
                  <ChevronDown
                    className="group-hover:-rotate-180 transition-all"
                    strokeWidth={1.5}
                    size={20}
                  />
                  <Suspense fallback={<></>}>
                    <HeaderCategoryDropdown />
                  </Suspense>
                </li>
              </ul>
            </div>
            <div className="flex gap-5">
              <MobileDropdown className="hidden md:flex lg:hidden" />
              <div className="flex items-center gap-3">
                <Headset size={30} />
                <div>
                  <h2 className="text-primary text-xl">
                    {convertToBengaliNumbers(HeaderData.headerPhone.phone)}
                  </h2>
                  <p className="text-sm -mt-1">২৪ ঘণ্টা সাপোর্ট</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
