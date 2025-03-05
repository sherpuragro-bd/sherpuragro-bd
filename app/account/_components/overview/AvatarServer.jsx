import { getServerSession } from "next-auth";
import Avatar from "./Avatar";
import { getUser } from "@/actions/user";
import { Suspense } from "react";

export default async function AvatarServer() {
  const session = await getServerSession();
  const user = await getUser();

  return (
    <>
      <Avatar avatar={user?.image} user={session?.user} />
    </>
  );
}
