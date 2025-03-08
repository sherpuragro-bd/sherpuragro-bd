"use server";

import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler, replaceMongoIdInArray } from "@/lib/utils";
import { SliderModel } from "@/models/slider.model";

export const createNewSliderAction = async (payload) => {
  try {
    await connectToDB();
    const newSlider = new SliderModel({ ...payload });
    const slider = await newSlider.save();
    return { success: true, msg: "স্লাইডার সফল ভাবে তরি হয়েসে" };
  } catch (err) {
    errorHandeler();
  }
};

export const getAllSlidersFrontendAction = async () => {
  try {
    await connectToDB();
    const allSliders = await SliderModel.find({}).lean();
    return replaceMongoIdInArray(allSliders);
  } catch (err) {
    errorHandeler();
  }
};
