"use server";

import CategoryModel from "@/models/category.model";
import { getUser } from "../user";
import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler, replaceMongoIdInArray } from "@/lib/utils";
import { unstable_cache } from "next/cache";

export const newCategoryAction = async (data) => {
  const user = await getUser();

  if (user?.role !== "admin") {
    return "unauthorized user";
  }

  try {
    const newCategoryObj = new CategoryModel(data);
    const newCategory = await newCategoryObj.save();
    return { success: true, msg: "ক্যাটাগরি সফল ভাবে তইরি হয়েছে" };
  } catch (err) {
    return { success: false, err: "অনাখাঙ্কিত সমস্যা" };
  }
};

export const getAllCategories = unstable_cache(
  async () => {
    try {
      await connectToDB();
      const allCategories = await CategoryModel.find({ publicity: "public" })
        .lean()
        .select("-descriptionCategory -publicity -seoDescription -seoTitle");

      return await replaceMongoIdInArray(
        allCategories?.sort(
          (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
        )
      );
    } catch (err) {
      return errorHandeler();
    }
  },
  ["categories"],
  { revalidate: 3600 }
);

export const bultUpdateCategory = async (payload) => {
  try {
    const op = payload.map((data) => ({
      updateOne: {
        filter: { _id: data._id },
        update: { $set: { order: data.order } },
      },
    }));

    await connectToDB();
    const updateCategoryOrder = await CategoryModel.bulkWrite(op);
    return { success: true, msg: "রি অর্ডার সম্পূর্ণ হয়েছে" };
  } catch (err) {
    return errorHandeler();
  }
};

export const CategoryDeleteAction = async (id) => {
  try {
    await connectToDB();
    const deleteCategory = await CategoryModel.findByIdAndDelete(id);
    return { success: true, msg: "ক্যাটাগ সফল ভাবে ডিলিট হয়েছে" };
  } catch (err) {
    errorHandeler();
  }
};

export const getSingleCategoryData = async (id) => {
  try {
    await connectToDB();
    const data = await CategoryModel.findById(id).lean();

    if (!data) return null;

    return { ...data, _id: `${data._id}` };
  } catch (err) {
    errorHandeler(err);
    return null;
  }
};
