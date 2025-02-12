import { TriangleAlert } from "lucide-react";

export default function Errorbox({ err, className }) {
  return (
    <>
      <div
        className={`w-full p-2 bg-red-200 flex text-sm items-center gap-3 font-light border text-red-600 border-red-400 rounded-md ${className}`}
      >
        <TriangleAlert color="red" size={20} strokeWidth={1} />
        {err || "অপ্রত্যাশিত সমস্যা"}
      </div>
    </>
  );
}
