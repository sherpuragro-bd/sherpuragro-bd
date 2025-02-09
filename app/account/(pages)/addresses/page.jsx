import Image from "next/image";

export default function Addresses() {
  return (
    <>
      <div className="text-center flex flex-col items-center pb-20">
        <Image width={300} height={300} src="/img/map.webp" alt="Map" />
        <h2 className="text-2xl">কোন ঠিকানা নেই!</h2>
        <p className="text-neutral-500">আপনি এখনও কোনও ঠিকানা যোগ করেননি।</p>
      </div>
    </>
  );
}
