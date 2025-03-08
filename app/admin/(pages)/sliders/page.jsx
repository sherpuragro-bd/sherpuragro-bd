"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui/Input";
import ImageUpload from "@/app/components/widgets/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { GalleryVertical, Info, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/app/components/ui/Label";
import { createNewSliderAction } from "@/actions/admin/Slider";

export default function Sliders() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bannerDesk, setBannerDesk] = useState(null);
  const [bannerTablet, setBannerTablet] = useState(null);
  const [bannerMobile, setBannerMobile] = useState(null);
  const [isNewsletter, setIsNewsletter] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [isLoading, setisLoading] = useState();

  const onSubmit = async (data) => {
    if (!bannerDesk) {
      return toast.error("ব্যানার আপলোড করা আবশ্যক");
    }

    const formData = {
      ...data,
      color,
      bannerDesk,
      bannerTablet,
      bannerMobile,
    };

    setisLoading(true);

    const res = await createNewSliderAction(formData);
    setisLoading(false);
    if (!res.success) {
      return toast.error(res.error);
    }
    window.location.reload();
    toast.success(res.msg);
  };

  return (
    <div className="w-full border">
      <div className="flex px-5 py-2 items-center justify-between w-full">
        <h2 className="text-2xl flex items-center gap-3">
          <GalleryVertical
            strokeWidth={1.6}
            size={40}
            className="p-2 bg-primary/10 border rounded-md"
          />
          স্লাইডারস
        </h2>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-5 py-2 rounded-md text-white bg-primary">
                অ্যাড নিউ
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
              <DialogTitle>নতুন স্লাইডার যুক্ত করুন</DialogTitle>
              <span className="w-full h-[0.5px] bg-text/20 scale-110" />
              <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
                <div className="flex justify-end w-full">
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="cursor-pointer relative -mb-28"
                    type="color"
                  />
                </div>
                <div className="space-y-7">
                  <Input
                    disabled={isLoading}
                    required
                    {...register("title", { required: "টাইটেল আবশ্যক" })}
                    maxLength={50}
                    label="টাইটেল"
                    placeholder="স্লাইডার টাইটেল"
                    className="!px-5"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}

                  <Input
                    disabled={isLoading}
                    {...register("link", {
                      required: "লিঙ্ক আবশ্যক",
                      pattern: {
                        value: /^https?:\/\/.+/i,
                        message: "সঠিক লিঙ্ক দিন",
                      },
                    })}
                    type="url"
                    label="লিঙ্ক"
                    placeholder="https://"
                    className="!px-5"
                  />
                  {errors.link && (
                    <p className="text-red-500">{errors.link.message}</p>
                  )}

                  <Input
                    disabled={isLoading}
                    {...register("content")}
                    label="কন্টেন্ট"
                    inputType="textarea"
                    rows="5"
                    placeholder="স্লাইডার কন্টেন্ট"
                    className="!px-5"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="newsletter"
                        checked={isNewsletter}
                        onCheckedChange={setIsNewsletter}
                      />
                      <label
                        htmlFor="newsletter"
                        className="!flex !flex-row gap-2 items-center cursor-pointer"
                      >
                        ব্যানার এ নিউজ লেটার শো করাবেন?{" "}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info
                              strokeWidth={1.5}
                              size={20}
                              className="text-primary"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            এই ব্যানার এর নিচে একটি নিউস <br /> লেটার ফর্ম শো
                            করবে
                          </TooltipContent>
                        </Tooltip>
                      </label>
                    </div>

                    {!isNewsletter && (
                      <div className="border p-5 space-y-3 rounded-lg mt-5">
                        <Label>ব্যানার বাটন</Label>
                        <span className="w-full h-[0.5px] scale-110 flex bg-text/10" />
                        <div className="space-y-3">
                          <Input
                            disabled={isLoading}
                            className="!px-5"
                            label="বাটন নাম"
                            placeholder="নাম"
                            required
                            {...register("bannerBtnName", {
                              required: "ব্যানার বাটন নাম",
                            })}
                          />
                          <Input
                            disabled={isLoading}
                            type="url"
                            placeholder="https://"
                            className="!px-5"
                            label="বাটন লিঙ্ক"
                            required
                            {...register("bannerBtnLink", {
                              required: "ব্যানার বাটন লিঙ্ক",
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-5 flex-wrap">
                    <span className="w-full h-[0.5px] flex bg-text/10" />
                    <ImageUpload
                      compressOption={{ maxSizeMB: 2, maxWidthOrHeight: 2000 }}
                      required
                      label="ব্যানার"
                      folder="/sliders"
                      htmlFor="deskBannerUpload"
                      onUpload={setBannerDesk}
                    />
                    <ImageUpload
                      label="ব্যানার ট্যাবলেট"
                      folder="/sliders"
                      htmlFor="tabletBannerUpload"
                      onUpload={setBannerTablet}
                    />
                    <ImageUpload
                      label="ব্যানার মোবাইল"
                      folder="/sliders"
                      htmlFor="mobileBannerUpload"
                      onUpload={setBannerMobile}
                    />
                  </div>
                  <span className="w-full h-[0.5px] flex bg-text/20 scale-110" />
                  <div className="w-full flex justify-end">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="px-5 py-2 rounded-md flex items-center gap-3 font-light -my-2 text-white bg-primary"
                    >
                      {isLoading && <Loader2 className="animate-spin" />}সেভ
                      করুন
                    </button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
