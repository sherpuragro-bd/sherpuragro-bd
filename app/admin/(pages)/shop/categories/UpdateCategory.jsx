"use client";

import { getSingleCategoryData } from "@/actions/admin/Category";
import { PublicitySelect } from "@/app/admin/_components/PublicitySelect";
import Alert from "@/app/components/ui/Alert";
import { Input } from "@/app/components/ui/Input";
import LineErro from "@/app/components/ui/LineErro";
import { LinkHighLight } from "@/app/components/ui/LinkHighLight";
import ColorPicker from "@/app/components/widgets/ColorPicker";
import ImageUpload from "@/app/components/widgets/ImageUpload";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdateCategory({ id }) {
  const [loading, setloading] = useState();
  const [categoryData, setcategoryData] = useState();
  const [allCategories, setallCategories] = useState();
  const [categoryImage, setcategoryImage] = useState("");
  const [seoImage, setseoImage] = useState("");
  const [publicity, setpublicity] = useState("public");
  const [capturedLink, setCapturedLink] = useState("");
  const [permalLink, setPermalLink] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [updateItem, setupdateItem] = useState();
  const [color, setColor] = useState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handlePermalLink = (e) => {
    const inputValue = e.target.value.trim();
    setCapturedLink(inputValue);
    setPermalLink("");
    if (inputValue.length === 0) {
      setPermalLink("");
      if (debounceTimer) clearTimeout(debounceTimer);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(async () => {
      const url = slugify(inputValue, { lower: true, strict: true });

      try {
        const permalLinkGenerated = await verifyUrl(url, "category");
        setPermalLink(permalLinkGenerated || url);
      } catch (error) {
        setPermalLink(url);
      }
    }, 1000);

    setDebounceTimer(newTimer);
  };

  const fetchCategoryData = async (id) => {
    const res = await getSingleCategoryData(id);
    setloading(false);
    setcategoryData(res);
  };

  useEffect(() => {
    setloading(true);
    fetchCategoryData(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loader2 size={40} className="text-primary animate-spin" />
        </div>
      ) : (
        <>
          <form className="space-y-7">
            <Input
              {...register("nameCategory", {
                required: "ক্যাটাগরিস নাম আবশ্যক",
              })}
              maxLength="50"
              label="নাম"
              placeholder="ক্যাটাগরিস নাম"
              className="!pl-5"
            >
              {errors.nameCategory && (
                <LineErro className={`pt-5`}>
                  {errors.nameCategory.message}
                </LineErro>
              )}
            </Input>

            <div className="w-full">
              <Input
                onChange={handlePermalLink}
                maxLength="50"
                value={permalLink || capturedLink}
                label="পেরমাল লিঙ্ক"
                placeholder="ক্যাটাগরি পেরমাল লিঙ্ক"
                className="!pl-5"
              >
                {errors.permalLink && (
                  <LineErro className={`pt-5`}>
                    {errors.permalLink.message}
                  </LineErro>
                )}
              </Input>
              <p className="mt-4 font-light text-cyan-600">
                প্রিভিউ:{" "}
                <LinkHighLight
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/categories/${permalLink}`}
                >{`${process.env.NEXT_PUBLIC_SITE_URL}/categories/${permalLink}`}</LinkHighLight>
              </p>
            </div>

            <Input
              {...register("descriptionCategory")}
              maxLength="50"
              rows="4"
              inputType="textarea"
              label="কন্টেন্ট"
              placeholder="ক্যাটাগরি কন্টেন্ট"
              className="!pl-5"
            />

            <div className="flex flex-col gap-2 w-full">
              <PublicitySelect value={publicity} onValueChange={setpublicity} />
            </div>

            <div className="flex gap-5 w-full sm:flex-nowrap flex-wrap p-5 border">
              <ColorPicker
                className="!w-fit"
                windowLoaded={windowLoaded}
                color={color}
                onChange={setColor}
              />
              <ImageUpload
                folder="/categories/images"
                htmlFor={"categoryImageUpload"}
                label="ক্যাটাগরি ইমেজ"
                onUpload={setcategoryImage}
              />
            </div>

            <div className="p-5 border space-y-5">
              <Label>সার্চ ইঞ্জিন</Label>
              <div className="flex gap-5 border p-5 flex-wrap">
                <Input
                  {...register("seoTitle")}
                  label="এসইও টাইটেল"
                  className="!pl-3"
                  placeholder="এসইও টাইটেল লিখুন"
                />
                <Input
                  {...register("seoDescription")}
                  label="এসইও ডেসক্রিপশন "
                  inputType="textarea"
                  className="!pl-3"
                  placeholder="এসইও ডেসক্রিপশন লিখুন"
                />
                <div>
                  <Alert className="my-5">
                    গুগল মেটা কীওয়ার্ডগুলি সরিয়ে দিয়েছে, আপনার ওয়েবসাইটে
                    মেটা কীওয়ার্ড যুক্ত করার দরকার নেই। আরও জানুন
                    https://yoast.com/meta-keywords
                  </Alert>
                </div>
                <ImageUpload
                  folder="/categories/og"
                  htmlFor={"seoImageUpload"}
                  compressOption={{ maxSizeMB: 1, maxWidthOrHeight: 1000 }}
                  required={true}
                  label="এসইও ইমেজ"
                  onUpload={setseoImage}
                />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/70 font-light">
              সেভ করুন
            </Button>
          </form>
        </>
      )}
    </>
  );
}
