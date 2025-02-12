import { getServerSession } from "next-auth";
import Avatar from "./Avatar";
import { LinkHighLight } from "@/app/components/ui/LinkHighLight";
import { getUser } from "@/actions/user";

export default async function Profile() {
  const session = await getServerSession();
  const user = await getUser();

  return (
    <>
      <div className="flex w-full p-5">
        <div className="flex gap-5 max-[450px]:flex-col min-[450px]:items-center">
          <div className="min-w-[80px]">
            <Avatar avatar={user?.image} user={session.user} />
          </div>
          <div className="w-11/12">
            <h2 className="text-xl font-en font-semibold">
              {session?.user.name}
            </h2>
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
