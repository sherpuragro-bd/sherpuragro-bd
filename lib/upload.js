"use server";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadImage = async (file, folderPath) => {
  if (!file) return { success: false, error: "দুঃখিত ইমেজ খুঁজে পাওয়া যাইনি" };

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const response = await imagekit.upload({
    file: fileBuffer.toString("base64"),
    fileName: file.name,
    folder: `/${folderPath || "/root"}`,
  });

  if (!response.url) {
    return { success: false, error: "দুঃখিত ইমেজ আপলোড হয়নি " };
  }

  return { success: true, msg: "ইমেজ আপলোড সফল হয়েছে ", url: response.url };
};
