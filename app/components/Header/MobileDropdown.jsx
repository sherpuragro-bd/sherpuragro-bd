"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HeaderDefaultNavs } from "@/data/Header";
import { Turn as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import NavLink from "../ui/NavLink";
import { ChevronDown } from "lucide-react";
import { getAllCategories } from "@/actions/admin/Category";

const MobileDropdown = ({ className = "" }) => {
  const [toggeled, settoggeled] = useState(false);
  const [categoriesExpand, setcategoriesExpand] = useState(false);
  const [allCategories, setallCategories] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getAllCategories();
      setallCategories(res);
    };
    fetchCategory();
  }, []);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div
            onClick={() => settoggeled(!toggeled)}
            className={`flex items-center bg-slate-100 border h-10 border-slate-200 min-[550px]:pr-3 rounded-md pl-0 ${className}`}
          >
            <Hamburger toggled={toggeled} toggle={settoggeled} size={20} />
            <span className="max-[550px]:hidden">মেনু</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-wrap mt-5 sm:min-w-[500px] lg:hidden !shadow-none">
          <div className="p-2 w-full">
            <div className="w-full grid sm:grid-cols-2 gap-2">
              {HeaderDefaultNavs.map((navs, index) => (
                <NavLink
                  activeClass={`bg-primary/10 border-primary/30`}
                  className={`px-5 py-2 border rounded-lg hover:bg-primary/10 hover:border-primary/30 hover:underline`}
                  key={`mobilemenuNavs-${index}`}
                  href={navs.path}
                >
                  {navs.pathName}
                </NavLink>
              ))}
              <button
                onClick={() => setcategoriesExpand(!categoriesExpand)}
                className={`flex px-5 py-2 group border rounded-lg text-center justify-center transition-all gap-2 ${
                  categoriesExpand &&
                  "bg-primary/10 border-primary/30 text-primary"
                }`}
              >
                ক্যাটেগরিস{" "}
                <ChevronDown
                  className={`${
                    categoriesExpand && "-rotate-180"
                  } transition-all`}
                  strokeWidth={1.5}
                />
              </button>
            </div>
            {categoriesExpand && (
              <div className="p-5 border rounded-lg mt-2 grid grid-cols-2 sm:grid-cols-3 gap-5">
                {allCategories &&
                  allCategories.map((category, index) => (
                    <NavLink
                      key={`category-mobile-${index}`}
                      href={`/categories/${category.permalLink}`}
                    >
                      {category.nameCategory}
                    </NavLink>
                  ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MobileDropdown;
