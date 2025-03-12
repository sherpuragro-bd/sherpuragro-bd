"use client";

import { getAllCategories } from "@/actions/admin/Category";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleMinus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [expand, setexpand] = useState(11);

  const fetchCategories = async () => {
    try {
      const cachedCategories = JSON.parse(localStorage.getItem("categories"));
      if (cachedCategories) setAllCategories(cachedCategories);

      const res = await getAllCategories();
      if (res) {
        localStorage.setItem("categories", JSON.stringify(res));
        setAllCategories(res);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-52 max-[1008px]:hidden flex border text-text/80 flex-col gap-3 border-primary/40 font-normal p-5 rounded-xl">
      {allCategories.length > 0
        ? allCategories?.slice(0, expand).map((category) => (
            <Link
              href={`/categories/${category.permalLink}`}
              className="hover:underline"
              key={`category-${category.id}`}
            >
              {category?.nameCategory}
            </Link>
          ))
        : Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-6" />
          ))}
      {allCategories.length > 11 && (
        <div className="flex w-full justify-center pt-2">
          <button
            className="flex  items-center gap-2"
            onClick={() => setexpand(expand <= 11 ? allCategories.length : 11)}
          >
            {expand <= 11 ? (
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
      )}
    </div>
  );
}
