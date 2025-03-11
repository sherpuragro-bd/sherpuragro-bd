import { SidebarTrigger } from "@/components/ui/sidebar";
import { Globe } from "lucide-react";
import Link from "next/link";
import NewLink from "../ui/NewLink";

export default function AdminHeader() {
  return (
    <>
      <header className="w-full h-12 py-2 px-5 border-b flex items-center justify-between">
        <div>
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="flex items-center gap-5">
          <NewLink href={`/`}>
            <button className="flex items-center group gap-2 border border-adminBg py-1 px-3 rounded-lg text-sm">
              <Globe
                className="group-hover:animate-spin"
                size={18}
                strokeWidth={1.5}
              />
              ভিজিট করুন
            </button>
          </NewLink>
        </div>
      </header>
    </>
  );
}
