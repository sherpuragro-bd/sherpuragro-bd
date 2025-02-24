import { Skeleton } from "@/components/ui/skeleton";

export default function AddressNewLoading() {
  return (
    <>
      <div className="p-10 space-y-5 pb-14 mt-5 w-full rounded-xl border">
        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
          <Skeleton className="h-10 w-full sm:w-1/2 bg-gray-200" />
          <Skeleton className="h-10 w-full sm:w-1/2 bg-gray-200" />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
          <Skeleton className="h-10 w-full sm:w-1/2 bg-gray-200" />
          <Skeleton className="h-10 w-full sm:w-1/2 bg-gray-200" />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
          <Skeleton className="h-10 w-full sm:w-1/2 bg-gray-200" />
          <Skeleton className="h-10 w-full sm:w-1/2 bg-gray-200" />
        </div>
        <Skeleton className="h-10 w-full sm:w-40 bg-primary" />
      </div>
    </>
  );
}
