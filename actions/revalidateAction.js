"use server";
import { revalidateTag } from "next/cache";

export const revalidateCategories = async () => {
  revalidateTag("categories");
};
