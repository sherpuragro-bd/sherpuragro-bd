import AddressNew from "@/app/account/_components/Addressnew";

export const metadata = {
  title: "নতুন ঠিকানা যুক্ত করুন",
};

export default async function GeolocationComponent() {
  return (
    <div className="w-full">
      <AddressNew />
    </div>
  );
}
