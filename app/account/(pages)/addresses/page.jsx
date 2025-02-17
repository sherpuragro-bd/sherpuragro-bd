import { GetAllAddress } from "@/actions/user";
import {
  ChevronRight,
  CirclePlus,
  MapPin,
  Pencil,
  Trash,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AddressCard } from "./AddressCard";

export const metadata = {
  title: "আপনার সকল ঠিকানা",
};

export default async function Addresses() {
  const allAddress = await GetAllAddress();
  const addressCounts = allAddress.length || 0;
  return (
    <>
      {allAddress && allAddress?.length > 0 ? (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
          <Link
            href={addressCounts >= 3 ? "" : `/account/addresses/new`}
            className={` gap-5 flex-wrap font-light flex items-center p-5 py-3 justify-center  rounded-xl border border-dashed${
              addressCounts >= 3
                ? "text-red-800 border-red-300 bg-red-100"
                : "text-primary/40  border-primary/80 border-dashed bg-primary/20"
            }`}
          >
            <div className="flex gap-x-5 gap-y-3 items-center flex-wrap justify-center">
              {addressCounts >= 3 ? (
                <>
                  <XCircle color="#f87171" size={30} strokeWidth={1} />
                  <span className="text-red-400">সর্বোচ্চ ৩টি ঠিকানা</span>
                </>
              ) : (
                <>
                  <CirclePlus size={30} strokeWidth={1} />
                  নতুন ঠিকানা যুক্ত করুন
                </>
              )}
            </div>
          </Link>
          {allAddress.map((address, index) => (
            <Suspense key={index} fallback={<>Loading</>}>
              <AddressCard key={`address-${index}`} address={address} />
            </Suspense>
          ))}
        </div>
      ) : (
        <NoAddress />
      )}
    </>
  );
}

const NoAddress = () => {
  return (
    <div className="text-center flex flex-col items-center pb-20">
      <Image width={300} height={300} src="/img/map.webp" alt="Map" />
      <h2 className="text-2xl">কোন ঠিকানা নেই!</h2>
      <p className="text-neutral-500">আপনি এখনও কোনও ঠিকানা যোগ করেননি।</p>
      <Link
        href={`/account/addresses/new`}
        className="flex text-text/60 transition-all hover:underline items-center rounded-md"
      >
        নতুন ঠিকানা যোগ করুন <ChevronRight size={20} />
      </Link>
    </div>
  );
};
