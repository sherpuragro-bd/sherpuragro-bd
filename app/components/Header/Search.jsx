"use client";

import { GrSearch } from "react-icons/gr";

export default function Search() {
  return (
    <>
      <form className="w-6/12 hidden md:block">
        <div className="px-5 flex items-center border py-[5px] focus-within:border-primary/50 transition-all rounded-md">
          <input
            type="text"
            placeholder="পর্ণ খুজুন"
            className="placeholder:font-extralight bg-transparent py-1 w-full font-extralight"
          />
          <button>
            <GrSearch size={22} />
          </button>
        </div>
      </form>
    </>
  );
}
