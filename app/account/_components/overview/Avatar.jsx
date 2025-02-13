"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Camera, Loader2, Trash, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { updateAvatar, updateUser } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function Avatar({ user, avatar }) {
  const router = useRouter();
  const [storingImage, setstoringImage] = useState(false);
  const [scale, setscale] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [removingAvatar, setremovingAvatar] = useState(false);
  const editor = useRef(null);

  const handleAvatarUpload = (e) => {
    const avatarFile = e.target.files[0];

    if (!avatarFile) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(avatarFile.type)) {
      toast.error("ফাইলের ধরণ সমর্থিত নয়");
      e.target.value = "";
      return;
    }

    const imageObjectUrl = URL.createObjectURL(avatarFile);
    setImageUrl(imageObjectUrl);
  };

  const getImageUrl = async () => {
    setstoringImage(true);
    const dataUrl = editor.current.getImage().toDataURL();
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(blob, options);
    const avatarUpdate = await updateAvatar(compressedImage);
    toast.success("প্রোফাইল ছবি যুক্ত হয়েছে");
    router.refresh();
    setImageUrl(false);
    setstoringImage(false);
  };

  const removeAvatar = async () => {
    if (removingAvatar || !avatar) return;

    setremovingAvatar(true);
    const res = await updateUser({ image: "" });

    if (!res.success) {
      toast.error("দুঃখিত অনাআখাঙ্কিত সমস্যা");
      setremovingAvatar(false);
      return;
    }

    toast.success("প্রোফাইল এর ছবি রিমুভ হয়েছে");
    router.refresh();
    setImageUrl(null);
    setremovingAvatar(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-col items-end cursor-pointer w-fit group">
            <Image
              width={80}
              height={80}
              className="rounded-full ring-4 ring-primary/60 group-hover:ring-primary cursor-pointer transition-all"
              src={
                avatar ||
                user?.image ||
                `/api/og/avatar?avatar=${user?.name?.slice(0, 1)}`
              }
              alt={user?.name}
            />
            <span className="bg-primary -mt-5 z-30 transition-all text-white p-1 rounded-md">
              <Camera size={15} />
            </span>
            <div className="opacity-0 transition-all group-hover:opacity-100 w-[80px] h-[80px] bg-black/30 rounded-full absolute"></div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-36 mt-2 p-1 text-neutral-500 font-light font-bn text-sm">
          <input
            onChange={handleAvatarUpload}
            accept=".png, .jpeg, .jpg, .webp"
            type="file"
            className="hidden"
            id="uploadAvatar"
          />
          <label
            htmlFor="uploadAvatar"
            className="flex border cursor-pointer border-transparent hover:border-neutral-800/10 rounded-md p-1 px-2 transition-all w-full items-center gap-2"
          >
            <Upload strokeWidth={1} size={17} />
            পরিবর্তন করুন
          </label>
          <button
            onClick={removeAvatar}
            disabled={!avatar}
            className={`flex border border-transparent hover:border-neutral-800/10 rounded-md p-1 px-2 transition-all w-full items-center gap-2 ${
              !avatar && "cursor-not-allowed"
            }`}
          >
            <Trash strokeWidth={1} size={17} />
            বাতিল করুন
          </button>
        </PopoverContent>
      </Popover>
      {imageUrl && (
        <section className="flex justify-center w-full h-screen overflow-y-scroll backdrop-blur-[2px] items-center fixed bg-black/30 left-0 top-0 z-[999999999999]">
          <div className="w-8/12 md:w-fit">
            <div className="w-full flex justify-end">
              <button
                onClick={() => setImageUrl(null)}
                className="-mb-12 mr-3 hover:rotate-45 z-30 hover:scale-90 transition-all"
              >
                <X strokeWidth={2} className="text-text" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-white items-center backdrop-blur-3xl border-primary/30 flex flex-col md:flex-row gap-10 p-5 px-8 md:p-10 rounded-xl border  justify-center">
              <div className="overflow-hidden rounded-[99999999px] w-[130px] h-[130px] ring-4 ring-primary/60 ring-offset-4 ring-offset-white/50">
                <Dropzone
                  onDrop={(dropped) => setImage(dropped[0])}
                  noClick
                  noKeyboard
                  style={{ width: "130px", height: "130px" }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <AvatarEditor
                        ref={editor}
                        border={0}
                        width={130}
                        height={130}
                        borderRadius={1000000000}
                        scale={scale}
                        image={imageUrl}
                      />
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
              </div>
              <div>
                <input
                  onChange={handleAvatarUpload}
                  accept=".png, .jpeg, .jpg, .webp"
                  id="chnageAvatar"
                  type="file"
                  className="hidden"
                />
                <div className="w-full max-w-md mx-auto">
                  <label
                    htmlFor="chnageAvatar"
                    className="block text-sm font-light text-gray-700"
                  >
                    +/-
                  </label>
                  <div>
                    <input
                      onChange={(e) => setscale(e.target.value)}
                      id="range"
                      type="range"
                      min="1"
                      max="4.0"
                      step="0.1"
                      value={scale}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-custom"
                    />
                  </div>
                </div>
                <label
                  htmlFor="chnageAvatar"
                  className="flex bg-text/10 mt-5 border-text/10 cursor-pointer items-center text-sm w-full gap-3 font-light border p-1 px-3 rounded-md mb-3"
                >
                  <Upload strokeWidth={1} size={17} />
                  পরিবর্তন করুন
                </label>
                <button
                  onClick={getImageUrl}
                  className="flex bg-primary hover:bg-primary/60 transition-all text-white text-center justify-center cursor-pointer items-center text-sm w-full gap-3 font-extralight border p-1 px-3 rounded-md mb-3"
                >
                  {storingImage ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    "সংরক্ষণ করুন"
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* )} */}
    </>
  );
}
