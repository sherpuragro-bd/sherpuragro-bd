import { Info } from "lucide-react";

export default function Alert({ className, children }) {
  return (
    <div
      className={`flex items-start font-light border p-5 border-l-primary border-l-4 gap-2 py-3 text-sm ${
        className || ""
      }`}
    >
      <Info strokeWidth={2} color="#3bb77e" size={20} />
      {children}
    </div>
  );
}
