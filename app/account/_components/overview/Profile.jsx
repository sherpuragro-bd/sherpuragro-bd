import { LinkHighLight } from "@/app/components/ui/LinkHighLight";
import AvatarServer from "./AvatarServer";
import { Suspense } from "react";

export default async function Profile() {
  return (
    <>
      <div className="flex w-full p-5">
        <div className="flex gap-5 max-[450px]:flex-col min-[450px]:items-center">
          <div className="min-w-[80px]">
            <Suspense fallback={<>Loading</>}>
              <AvatarServer />
            </Suspense>
          </div>
          <div className="w-11/12">
            {/* <h2 className="text-xl">{user?.name || session?.user.name}</h2> */}
            <p className="font-extralight text-sm pt-1">
              আপনার অ্যাকাউন্ট ড্যাশবোর্ড থেকে আপনি আপনার{" "}
              <LinkHighLight href={`/account/orders?sort=recent`}>
                সাম্প্রতিক অর্ডারগুলি
              </LinkHighLight>{" "}
              দেখতে, আপনার{" "}
              <LinkHighLight href="/account/addresses">শিপিং</LinkHighLight> এবং{" "}
              <LinkHighLight href="/account/addresses">
                বিলিং ঠিকানাগুলি
              </LinkHighLight>{" "}
              পরিচালনা করতে এবং আপনার{" "}
              <LinkHighLight href="/account/edit-account">
                পাসওয়ার্ড{" "}
              </LinkHighLight>
              এবং{" "}
              <LinkHighLight href="/account/edit-account">
                অ্যাকাউন্টের বিবরণ
              </LinkHighLight>{" "}
              সম্পাদনা করতে পারেন।
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
