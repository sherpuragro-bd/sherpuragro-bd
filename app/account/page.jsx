import { getUser } from "@/actions/user";
import Profile from "./_components/overview/Profile";

export default async function page() {
  return (
    <>
      <Profile />
    </>
  );
}
