import { getUser } from "@/actions/user";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NotFound from "../not-found";
import AdminHeader from "../components/Header/AdminHeader";
import Header from "../components/Header/Header";
import BottomBar from "../components/Header/BottomBar";

export const metadata = {
  title: "এডমিন ড্যাশবোর্ড | শেরপুর এগ্রো ",
};

export default async function Layout({ children }) {
  const user = await getUser();

  if (user?.role !== "admin") {
    return (
      <>
        <Header />
        <NotFound />
        <BottomBar />
      </>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <AdminHeader />
        <div className="w-full flex justify-center">
          <div className="w-full p-5 md:max-w-[1440px] md:p-10">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
