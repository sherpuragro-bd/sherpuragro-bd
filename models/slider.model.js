import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    link: {
      type: String,
    },
    content: String,
    bannerBtnName: String,
    bannerBtnLink: String,
    color: String,
    bannerDesk: {
      type: String,
      required: true,
    },
    bannerTablet: String,
    bannerMobile: String,
    order: Number,
  },
  { timestamps: true }
);

export const SliderModel =
  mongoose.models.Slider || mongoose.model("Slider", sliderSchema);
