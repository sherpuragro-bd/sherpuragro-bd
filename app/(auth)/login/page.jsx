import LoginForm from "./LoginForm";

export const metadata = {
  title: "লগইন করুন",
  description:
    "আপনার ব্যক্তিগত তথ্য এই ওয়েবসাইট জুড়ে আপনার অভিজ্ঞতা সমর্থন করতে, আপনার অ্যাকাউন্টে অ্যাক্সেস পরিচালনা করতে ব্যবহার করা হবে।",
};

export default function Login() {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-primary px-5 items-center justify-center py-40 inline-flex">
        <LoginForm />
      </div>
    </section>
  );
}
