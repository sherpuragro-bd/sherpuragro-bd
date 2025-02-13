import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [70, "Name must be less than 70 characters"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
      maxlength: [255, "Email must be less than 255 characters"],
    },
    phone: {
      type: String,
      required: true,
      maxlength: [15, "Phone number must be at most 15 characters"],
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    upazila: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
      maxlength: [255, "Email must be less than 255 characters"],
    },
  },
  { timestamps: true }
);

export const AddressModel =
  mongoose.models.Address || mongoose.model("Address", addressSchema);
