"use client";

import { getAllCategories } from "@/actions/admin/Category";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleMinus, LayoutGrid, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import NewLink from "../../ui/NewLink";

export default function BrowserAllCetegories() {
  const [allCategoriesData, setallCategoriesData] = useState();
  const [expand, setexpand] = useState(6);

  useEffect(() => {
    const getAllCategoriesFun = async () => {
      const res = await getAllCategories();
      setallCategoriesData(res);
    };
    getAllCategoriesFun();
  }, []);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="text-sm bg-primary flex items-center font-light gap-2 px-5 py-2 rounded-md text-white">
            <LayoutGrid size={20} strokeWidth={1.5} />
            সকল ক্যাটেগরিস
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`mt-5 rounded-lg bg-white border-primary/50 shadow-none w-[400px] ml-5 2xl:translate-x-28`}
        >
          <div className="grid grid-cols-2 gap-4 p-3 w-full">
            {allCategoriesData
              ? allCategoriesData?.slice(0, expand).map((category, index) => (
                  <NewLink
                    key={`categories-${index}`}
                    className="px-5 hover:border-primary/80 transition-all py-2 border rounded-lg"
                    href={`/categories/${category.permalLink}`}
                  >
                    {category.nameCategory}
                  </NewLink>
                ))
              : "loading"}
          </div>
          <div className="w-full flex justify-center">
            <button
              className="flex  items-center gap-2"
              onClick={() =>
                setexpand(expand <= 6 ? allCategoriesData.length : 6)
              }
            >
              {expand <= 6 ? (
                <>
                  <Plus color="#3bb77e" size={20} /> আরও দেখুন
                </>
              ) : (
                <>
                  <CircleMinus color="#3bb77e" size={20} /> কুম দেখুন
                </>
              )}
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
