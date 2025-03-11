"use client";

import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import LogoURI from "../public/img/logo.png";
import { usePathname } from "next/navigation";
import { adminNavData } from "@/lib/utils";
import NewLink from "@/app/components/ui/NewLink";

export function AppSidebar({ user, ...props }) {
  const pathName = usePathname();

  return (
    <Sidebar className="p-2" collapsible="icon" {...props}>
      <SidebarHeader className="pl-3">
        <NewLink href={"/admin"}>
          <Image width={130} src={LogoURI} alt="Sherpur Agro Logo" />
        </NewLink>
        <span className="flex h-[1px] w-full bg-slate-200" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 text-text gap-1 mt-2">
          {adminNavData.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                // prettier-ignore
                className={`${
                  (item.activePathName === pathName &&
                    "text-white bg-primary hover:bg-black hover:!text-white") ||
                  (item.url === pathName &&
                    "text-white bg-primary hover:bg-black hover:!text-white")
                }`}
                asChild
              >
                <NewLink href={`/admin/${item.url}`} className={`font-normal`}>
                  {item.icon && <item.icon />}
                  {item.title}
                </NewLink>
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        className="!text-text"
                        asChild
                        isActive={item.isActive}
                      >
                        <NewLink href={`/admin/${item.url}`}>
                          {" "}
                          {item.icon && (
                            <item.icon color="#253d4e" strokeWidth={1.5} />
                          )}
                          {item.title}
                        </NewLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
