"use client";

import { getAllCategories } from "@/actions/admin/Category";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { rgbaToHexWithAlpha } from "@/lib/utils";
import LoadingPlaceholder from "../../../public/img/placeholder.png";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HomeCategories() {
  const categorySliderRef = useRef();

  const fetchData = async () => {
    const res = await getAllCategories({
      id: null,
      updatedAt: null,
      createdAt: null,
    });

    return res;
  };

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoriesHome"],
    queryFn: fetchData,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleNext = () => {
    if (categorySliderRef.current) categorySliderRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (categorySliderRef.current) categorySliderRef.current.swiper.slidePrev();
  };

  return (
    <section className="flex justify-center w-full">
      <div className="max-w-primary w-full px-5 py-14">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-3xl">ক্যাটেগরিস</h2>
          <div className="flex items-center gap-5">
            <button
              onClick={handlePrev}
              className="bg-slate-200 p-2 rounded-full hover:text-white text-slate-500 transition-all hover:bg-primary"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="bg-slate-200 p-2 rounded-full hover:text-white text-slate-500 transition-all hover:bg-primary"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <Swiper
          ref={categorySliderRef}
          className="mt-5"
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 1000 }}
          spaceBetween={20}
          speed={1000}
          loop={true}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 10 },
          }}
        >
          <div className="w-full overflow-x-hidden gap-5 flex justify-between">
            {isLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={`category-skeleton-${Math.random(34)}`}
                  className="p-5 border flex justify-center items-center flex-col rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"
                >
                  <Skeleton className={`w-[70px] h-[60px] rounded-lg`} />
                  <Skeleton className={`w-[60px] h-[20px] rounded-sm mt-3`} />
                </div>
              ))}
          </div>
          {!isLoading &&
            categories
              .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
              .map((category) => (
                <SwiperSlide key={`category-key-${Math.random(34234324)}`}>
                  <Link
                    className={`p-5 border rounded-xl text-center group flex-col hover:!bg-white items-center gap-3 hover:border-primary/50 transition-all justify-center flex`}
                    style={{
                      background: rgbaToHexWithAlpha(
                        JSON.parse(category.color)
                      ),
                    }}
                    href={`/categories/${category.permalLink}`}
                  >
                    <Image
                      className="group-hover:scale-125 transition-all"
                      width={60}
                      height={60}
                      alt={category.nameCategory}
                      src={category.categoryIconImage || LoadingPlaceholder}
                    />
                    <div className="flex text-center justify-center w-full overflow-visible">
                      <span className="group-hover:underline whitespace-nowrap">
                        {category.nameCategory}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}
