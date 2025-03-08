import { getUser } from "@/actions/user";

export default async function UserName() {
  const user = await getUser();

  return (
    <>
      <h2 className="text-xl">{user?.name || session?.user.name}</h2>
    </>
  );
}
