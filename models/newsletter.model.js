import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const NewsletterModel =
  mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
