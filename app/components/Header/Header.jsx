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
import { HeaderData } from "@/data/Header";
import { convertToBengaliNumbers } from "@/lib/utils";
import { Headset } from "lucide-react";
import NewLink from "../ui/NewLink";

export default async function Header() {
  const session = await getServerSession();
  const user = await getUser();

  return (
    <>
      {user?.role === "admin" && (
        <section className="w-full py-1 bg-adminBg items-center px-5 flex justify-between">
          <NewLink className="flex" href={`/admin`}>
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
          </NewLink>
          <p className="text-white/80 font-extralight max-[800px]:hidden">
            আপনি শেরপুর এগ্রো এডমিন একসেস রয়েছে আপনি ছাইলে এডমিন প্যানেল এ জেতে
            পারেন
          </p>
          <NewLink href={`/admin`}>
            <Button className="bg-white text-black h-7 hover:bg-primary">
              এডমিন
            </Button>
          </NewLink>
        </section>
      )}
      <header className="flex justify-center items-center border-b z-[999] bg-white relative flex-col w-full">
        <div className="w-full items-center gap-5 max-w-primary p-5 py-6 inline-flex justify-between">
          <div className="flex items-center gap-10 xl:gap-20 w-full">
            <NewLink href="/" className="text-3xl">
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
            </NewLink>
            <Search />
          </div>
          <IconTray
            userData={{ ...user, _id: `${user?._id}` }}
            avatar={user?.image}
            user={session?.user}
          />
        </div>
        <div className="border-t hidden justify-center w-full py-2 md:flex">
          <div className="max-w-primary w-full flex px-5 justify-between">
            <BrowserAllCetegories />
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
      </header>
    </>
  );
}
