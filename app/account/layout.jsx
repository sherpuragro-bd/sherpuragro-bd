import { getUser } from "@/actions/user";
import AccountValidation from "./_components/AccountValidation";
import AccountSidebar from "./_components/AccountSidebar";

export default async function layout({ children }) {
  const user = await getUser();
  return (
    <>
      {!user?.isActive && <AccountValidation />}
      <section className="flex justify-center pt-10">
        <div className="w-full max-w-primary gap-10 flex-col md:flex-row px-5 flex">
          <div className="w-full md:w-4/12 xl:w-3/12">
            <AccountSidebar />
          </div>
          <div className="w-full md:w-9/12 flex justify-center items-start">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
