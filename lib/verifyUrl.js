"use server";

import CategoryModel from "@/models/category.model";
import { connectToDB } from "./connectToDB";
import slugify from "slugify";

export const verifyUrl = async (url, type) => {
  await connectToDB();

  if (type === "category") {
    const findDoc = await CategoryModel.findOne({ permalLink: url });
    if (findDoc?._id) {
      return generateRandomSlug(url);
    }
    return url;
  }
};

const generateRandomSlug = (title) => {
  const randomString = Math.random().toString(20).substring(2, 5);
  return slugify(`${title}-${randomString}`, { lower: true, strict: true });
};
