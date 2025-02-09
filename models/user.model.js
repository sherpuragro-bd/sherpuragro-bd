import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
      maxlength: [255, "Email must be less than 255 characters"],
    },
    phone: {
      type: String,
      required: true,
      maxlength: [15, "Phone number must be at most 15 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    dob: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
