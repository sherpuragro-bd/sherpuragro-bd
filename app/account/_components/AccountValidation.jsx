export default function AccountValidation() {
  return (
    <>
      <section className="flex justify-center w-full bg-gradient-to-br from-primary to-primary/80 py-2">
        <div className="w-full max-w-primary gap-3 items-center flex-wrap px-5 flex justify-center">
          <p className="md:text-base text-sm text-green-50">
            কোনো পর্ণ অর্ডার করার আগে অনুগ্রহ করে আপনার অ্যাকাউন্টটি ভেরিফাই
            করুন{" "}
            <button className="bg-white text-primary px-5 rounded-md">
              লিংক পাঠান{" "}
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
