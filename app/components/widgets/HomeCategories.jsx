"use client";

import { useEffect, useState } from "react";
import NewLink from "../ui/NewLink";

export default function HomeCategories() {
  const [allCategories, setallCategories] = useState();

  return (
    <>
      <section className="flex justify-center w-full">
        <div className="max-w-primary w-full px-5 py-14">
          <div>
            <h2 className="text-3xl">ক্যাটেগরিস</h2>
          </div>
          <div>
            <NewLink href="/account/addresses">Redirect</NewLink>
          </div>
        </div>
      </section>
    </>
  );
}
