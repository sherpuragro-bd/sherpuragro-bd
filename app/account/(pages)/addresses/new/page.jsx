import AddressNew from "@/app/account/_components/Addressnew";
import Banner from "@/app/account/_components/Banner";

export const metadata = {
  title: "নতুন ঠিকানা যুক্ত করুন",
};

export default async function GeolocationComponent() {
  return (
    <div className="w-full">
      <Banner />
      <AddressNew />
    </div>
  );
}
