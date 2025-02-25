import { getUser } from "@/actions/user";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NotFound from "../not-found";
import AdminHeader from "../components/Header/AdminHeader";

export const metadata = {
  title: "এডমিন ড্যাশবোর্ড | শেরপুর এগ্রো ",
};

export default async function Layout({ children }) {
  const user = await getUser();

  if (user?.role !== "admin") {
    return <NotFound />;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <AdminHeader />
        <div className="p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
