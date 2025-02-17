"use client";

import { deleteAddress } from "@/actions/user";
import { Loader2, MapPin, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const AddressCard = ({ address }) => {
  const [deleting, setdeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (deleting) return;

    Swal.fire({
      title: "আপনি ঠিকানাটি ডিলিট করতে চান?",
      text: "আপনি যদি এই ঠিকানা টি ডিলিট করতে চান তাহলে ডিলিট বাটন টিতে প্রেস করুন আরে যদি ক্যানসেল করতে চান তাহলে বাতিল করুন বাটন এ প্রেস করুন",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "বাতিল করুন",
      confirmButtonText: "ডিলিট",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      setdeleting(true);

      const res = await deleteAddress(address?._id, address?.author);
      setdeleting(false);
      if (!res.success) {
        return toast.error(res.error);
      }
      router.refresh();
      toast.success(res.msg);
    });
  };

  return (
    <>
      <div className="bg-sky-100 flex-col p-5 py-3 space-y-2 rounded-xl border border-dashed border-sky-300">
        <div className="flex gap-3">
          <h2 className="text-sm bg-sky-200 text-sky-800 font-light px-2 rounded-sm">
            {address?.name?.slice(0, 20)}
          </h2>
        </div>
        <div className="">
          <div className="flex gap-2 font-extralight">
            <MapPin className="text-sky-600" size={16} strokeWidth={1} />
            <p className="text-sm">{address?.address?.slice(0, 40)}</p>
          </div>
          <div className="flex gap-2 items-center font-extralight">
            <svg
              width="16"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#006A4D"
                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
              ></path>
              <circle fill="#F42A41" cx="16" cy="17.5" r="7"></circle>
            </svg>
            <p className="text-sm">{address?.phone?.slice(0, 11)}</p>
          </div>
        </div>
        <hr className="bg-sky-600/10" />
        <div className="flex items-center gap-2">
          <button
            disabled={deleting}
            onClick={handleDelete}
            className={`flex text-sm gap-2 group ${
              deleting && "cursor-not-allowed"
            }`}
          >
            {deleting ? (
              <Loader2
                className={`animate-spin transition-all`}
                strokeWidth={1}
                size={18}
                color="red"
              />
            ) : (
              <Trash
                className="group-hover:fill-red-400 duration-1000 transition-all"
                strokeWidth={1}
                size={18}
                color="red"
              />
            )}
            ডিলিট
          </button>
        </div>
      </div>
    </>
  );
};
