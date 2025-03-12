"use client";

import { Input } from "@/app/components/ui/Input";
import { LinkHighLight } from "@/app/components/ui/LinkHighLight";
import ColorPicker from "@/app/components/widgets/ColorPicker";
import { Plus, Tally4 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PublicitySelect } from "@/app/admin/_components/PublicitySelect";
import { Label } from "@radix-ui/react-dropdown-menu";
import Alert from "@/app/components/ui/Alert";
import LineErro from "@/app/components/ui/LineErro";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { verifyUrl } from "@/lib/verifyUrl";
import toast from "react-hot-toast";
import ImageUpload from "@/app/components/widgets/ImageUpload";
import {
  bultUpdateCategory,
  CategoryDeleteAction,
  getAllCategories,
  newCategoryAction,
} from "@/actions/admin/Category";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { rgbaToHexWithAlpha } from "@/lib/utils";
import Swal from "sweetalert2";
import UpdateCategory from "./UpdateCategory";
import { revalidateCategories } from "@/actions/revalidateAction";

export default function Page() {
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

  useEffect(() => {
    setWindowLoaded(true);
  }, []);

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

  const handelNewCategory = async (data) => {
    if (!permalLink) {
      toast.error("পারমাল্লিঙ্ক দিতে হবে");
      return;
    }
    const payload = {
      ...data,
      publicity: publicity,
      color: JSON.stringify(color),
      categoryIconImage: categoryImage,
      seoImage,
      permalLink,
    };

    const newCategory = await newCategoryAction(payload);
    if (!newCategory.success) {
      toast.error(newCategory.err);
      return;
    }

    window.location.reload();
    toast.success(newCategory.msg);
  };

  const allCategoriesFetch = async () => {
    const res = await getAllCategories();
    setallCategories(res);
    return res;
  };
  useEffect(() => {
    allCategoriesFetch();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) {
      return;
    }
    const { source, destination, draggableId } = result;

    const newCategories = [...allCategories];
    const [reorderedItem] = newCategories.splice(source.index, 1);
    newCategories.splice(destination.index, 0, reorderedItem);
    setallCategories(newCategories);

    const payload = [
      {
        _id: draggableId,
        order: destination.index,
      },
      {
        _id: allCategories[destination.index]?.id,
        order: source.index,
      },
    ];
    const res = await bultUpdateCategory(payload);
    if (!res.success) {
      return toast.error(res.err);
    }
    toast.success(res.msg);
    await revalidateCategories();
  };

  const handelCategoryDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "ডিলিট ক্যাটেগরি",
      text: "আপনি কি এই ক্যাটেগরি ডিলিট করতে চান তাহলে ডিলিট বাটন এ ক্লিক করুন",
      confirmButtonText: "ডিলিট",
      confirmButtonColor: "#3bb77e",
      showCancelButton: true,
      cancelButtonText: "ক্যানসেল",
    }).then(async (res) => {
      if (!res.isConfirmed) {
        return;
      }
      const deleted = await CategoryDeleteAction(id);
      if (!deleted.success) {
        return toast.error(res.err);
      }
      allCategoriesFetch();
      toast.success(deleted.msg);
    });
  };

  return (
    <>
      <div className="flex gap-5 xl:flex-row flex-col">
        <div className="w-full xl:w-3/12 h-fit border pb-5">
          <div className="flex justify-between items-center pl-5 pr-3 border-b py-2">
            <span className="text-xl">ক্যাটাগরিস</span>
            <button
              onClick={() => setupdateItem(undefined)}
              className="bg-primary hover:bg-primary/80 flex items-center gap-2 px-5 py-2 text-white font-light rounded-sm"
            >
              <Plus strokeWidth={1.5} /> অ্যাড
            </button>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-5 pb-0"
                >
                  {allCategories ? (
                    allCategories?.length > 0 ? (
                      allCategories.map((category, index) => (
                        <Draggable
                          key={category.id}
                          draggableId={category.id}
                          index={index}
                        >
                          {(draggableProvided) => (
                            <ContextMenu>
                              <ContextMenuTrigger>
                                <li
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  className="border flex items-center mb-3 gap-2 cursor-pointer bg-white"
                                >
                                  <button className="p-2 bg-slate-100 cursor-grabbing border-r">
                                    <Tally4
                                      strokeWidth={1}
                                      className="rotate-90"
                                    />
                                  </button>
                                  <div className="w-full items-center flex justify-between">
                                    {category.nameCategory}
                                    <span
                                      className="w-5 h-5 mr-3 rounded-md"
                                      style={{
                                        background: rgbaToHexWithAlpha(
                                          JSON.parse(category.color)
                                        ),
                                      }}
                                    />
                                  </div>
                                </li>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                <button
                                  onClick={() => setupdateItem(category.id)}
                                  className="px-3 text-green-600 flex gap-2 items-center py-1 text-start hover:bg-green-100 w-full rounded-sm"
                                >
                                  আপডেট
                                </button>
                                <button
                                  onClick={() =>
                                    handelCategoryDelete(category?.id)
                                  }
                                  className="px-3 text-red-500 flex gap-2 items-center py-1 text-start hover:bg-red-100 w-full rounded-sm"
                                >
                                  ডিলিট
                                </button>
                              </ContextMenuContent>
                            </ContextMenu>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="bg-green-100 border flex justify-center items-center border-primary border-dashed p-5 rounded-lg">
                        কোনা ক্যাটাগরি তইরি করা হইনি
                      </div>
                    )
                  ) : (
                    <ul className="space-y-3">
                      {Array.from({ length: 11 }).map((_, index) => (
                        <Skeleton
                          key={`cat-sk-${index}`}
                          className="w-full h-10"
                        />
                      ))}
                    </ul>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="w-full xl:w-9/12 flex border p-5">
          {updateItem ? (
            <>
              <UpdateCategory id={updateItem} />
            </>
          ) : (
            <form
              onSubmit={handleSubmit(handelNewCategory)}
              className="space-y-7"
            >
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
                <PublicitySelect
                  value={publicity}
                  onValueChange={setpublicity}
                />
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
                  style={{
                    backgroundColor: rgbaToHexWithAlpha(color || "white"),
                  }}
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
          )}
        </div>
      </div>
    </>
  );
}
