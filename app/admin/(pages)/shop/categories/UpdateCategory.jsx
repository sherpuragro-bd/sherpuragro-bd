"use client";

import { getSingleCategoryData } from "@/actions/admin/Category";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UpdateCategory({ id }) {
  const [loading, setloading] = useState();
  const [categoryData, setcategoryData] = useState();

  const fetchCategoryData = async (id) => {
    const res = await getSingleCategoryData(id);
    setloading(false);
    setcategoryData(res);
  };

  useEffect(() => {
    setloading(true);
    fetchCategoryData(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loader2 size={40} className="text-primary animate-spin" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
