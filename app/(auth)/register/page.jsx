import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "রেজিস্ট্রেশন করুন",
  description:
    "রেজিস্ট্রেশন ফর্মের সমস্ত তথ্য পূরণ করুন এবং আপনার কিছু ব্যক্তিগত তথ্য প্রদান করুন।",
};

export default function Register() {
  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-primary px-5 items-center justify-center py-40 inline-flex">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
