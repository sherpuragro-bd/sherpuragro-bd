"use client";

import { NextStep, NextStepProvider } from "nextstepjs";

const steps = [
  {
    tour: "accountStepTour",
    steps: [
      {
        icon: "📝",
        title: "নাম",
        content:
          "আপনার পুরো নাম টি লিখুন এবং যদি পারেন আপনার জাতীয় পরিচয়ই পত্র অনুযায়ে নাম প্রদান করুন",
        selector: "#name-field",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🔒",
        title: "পাসওয়ার্ড",
        content:
          "এখানে ৬ অক্ষর এর একটি সুরক্ষিত পাসওয়ার্ড প্রদান করুন যা আপনি কাওকে দেখাতে চাননা",
        selector: "#password-field",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📅",
        title: "জন্ম তারিখ",
        content:
          "আপনার জাতীয় পরিচয়ই পত্র অনুজায়ে যে জন্ম তারিখ দেওা রয়েছে টা প্রদান করুন",
        selector: "#dob-field",
        side: "left",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📱",
        title: "মোবাইল নাম্বার",
        content:
          "আপনার একটি সচল মোবাইল নাম্বার প্রদান করুন যা আপনি নিয়মিত ব্যাবহার করে থাকেন এবং মনে রাখবেন মোবাইল নাম্বারটি ১১ ডিজিট এর হতেহুবে",
        selector: "#phone-field",
        side: "left",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "✅",
        title: "সম্পূর্ণ করুন",
        content: "আপনার সকল তথ্য প্রদান সম্পূর্ণ হলে এখানে ক্লিক করুন",
        selector: "#submit-button",
        side: "top",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

export default function StepProvider({ children }) {
  const handelSkip = (step, tourName) => {
    localStorage.setItem(`${tourName}`, true);
  };

  return (
    <>
      <NextStepProvider>
        <NextStep onComplete={handelSkip} onSkip={handelSkip} steps={steps}>
          {children}
        </NextStep>
      </NextStepProvider>
    </>
  );
}
