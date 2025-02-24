"use client";

import { logoutUser } from "@/actions/login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function NavUser({ user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:!text-current"
        >
          <Link className="flex gap-2 items-center" href={`./admin/profile`}>
            <Avatar className="h-8 w-8 rounded-lg ring-2 ring-primary/50">
              <AvatarImage
                src={
                  user.image ||
                  `/api/og/avatar?avatar=${user.name
                    ?.slice(0, 1)
                    .toUpperCase()}`
                }
                alt={user.name}
              />
              <AvatarFallback className="rounded-lg">
                {user?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 !text-text text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs font-light">{user.email}</span>
            </div>
          </Link>
          <div onClick={async () => await logoutUser()}>
            <LogOut
              size={30}
              strokeWidth={1.5}
              className="text-text p-[5px] bg-slate-200 rounded-sm"
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
