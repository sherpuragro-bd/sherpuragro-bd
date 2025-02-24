import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`address-load-${index + 1}`}
          className="bg-sky-100 flex-col p-5 py-3 space-y-2 rounded-xl border border-dashed border-sky-300"
        >
          <div className="flex gap-3">
            <Skeleton className="h-5 w-32 bg-sky-200" />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-4 w-4 rounded-full bg-sky-300" />
              <Skeleton className="h-4 w-40 bg-sky-200" />
            </div>
            <div className="flex gap-2 items-center">
              <Skeleton className="h-4 w-4 rounded-full bg-sky-300" />
              <Skeleton className="h-4 w-28 bg-sky-200" />
            </div>
          </div>
          <div className="h-px bg-sky-600/10" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 bg-red-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
