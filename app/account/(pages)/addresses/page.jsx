import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Addresses() {
  return (
    <>
      <div className="text-center flex flex-col items-center pb-20">
        <Image width={300} height={300} src="/img/map.webp" alt="Map" />
        <h2 className="text-2xl">কোন ঠিকানা নেই!</h2>
        <p className="text-neutral-500">আপনি এখনও কোনও ঠিকানা যোগ করেননি।</p>
        <Link
          href={`/account/addresses/new`}
          className="mt-5 flex px-3 text-neutral-500 hover:bg-neutral-200 transition-all border border-neutral-400 items-center rounded-md"
        >
          নতুন ঠিকানা যোগ করুন <ChevronRight size={20} />
        </Link>
      </div>
    </>
  );
}
