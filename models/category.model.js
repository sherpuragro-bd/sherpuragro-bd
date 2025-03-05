import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    nameCategory: {
      type: String,
      required: true,
      maxlength: 50,
    },
    permalLink: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    descriptionCategory: {
      type: String,
      maxlength: 50,
    },
    publicity: {
      type: String,
      enum: ["public", "draft"],
      default: "public",
    },
    color: {
      type: String,
      default: '{"r":255,"g":255,"b":255,"a":1}',
    },
    categoryIconImage: {
      type: String,
    },
    seoTitle: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    seoImageCategory: {
      type: String,
    },
    order: Number,
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models.Categories || mongoose.model("Categories", CategorySchema);

export default CategoryModel;
