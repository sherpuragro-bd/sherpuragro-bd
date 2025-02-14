import Image from "next/image";

export default function Banner() {
  return (
    <>
      <div className="w-full flex mt-5 items-center gap-5 flex-wrap justify-center text-center bg-sky-100 p-5 py-2 sm:justify-between border-dashed border border-sky-400 rounded-xl">
        <Image
          className="hidden sm:block -mt-8 h-fit object-cover"
          src={`https://ik.imagekit.io/xjgs1kyel/default/mappin.webp?updatedAt=1739512118955`}
          width={120}
          height={30}
          alt="Map Pin"
        />
        <h2 className="text-text text-2xl">আপনার ঠিকানা লিখুন</h2>
        <div></div>
      </div>
    </>
  );
}
