import Link from "next/link";
import Search from "./Search";
import IconTray from "./IconTray";
import { getServerSession } from "next-auth";
import LogoURI from "../../../public/img/logo.png";
import Image from "next/image";

export default async function Header() {
  const session = await getServerSession();
  return (
    <>
      <header className="flex justify-center border-b z-[999] bg-white relative">
        <div className="w-full items-center gap-5 max-w-primary p-5 py-6 inline-flex justify-between">
          <div className="flex items-center gap-10 xl:gap-20 w-full">
            <Link href="/" className="text-3xl">
              <Image width={180} src={LogoURI} alt="Sherpur Agro Logo" />
            </Link>
            <Search />
          </div>
          <IconTray user={session?.user} />
        </div>
      </header>
    </>
  );
}
