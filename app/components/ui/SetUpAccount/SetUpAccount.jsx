"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calendar,
  CircleHelp,
  Key,
  Loader2,
  MoveRight,
  User,
} from "lucide-react";
import { Input, InputPass } from "../Input";
import { PhoneInput } from "../PhoneInput";
import { useForm } from "react-hook-form";
import LineErro from "../LineErro";
import { registerUser } from "@/actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNextStep } from "nextstepjs";

export default function SetUpAccount({ user, session }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const { user: AuthUser } = session;
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState();
  const { startNextStep, closeNextStep } = useNextStep();

  const router = useRouter();

  useEffect(() => {
    const canIOpen = localStorage.getItem("accountStepTour");
    if (canIOpen !== "true") {
      startNextStep(`accountStepTour`);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleUserRegister = async (data) => {
    if (isRegistering) {
      return;
    }

    if (number.length < 11) {
      setNumberError(true);
      return;
    } else {
      setNumberError(false);
    }

    closeNextStep();
    setIsRegistering(true);

    const res = await registerUser({
      ...data,
      phone: number,
      email: AuthUser?.email,
      isActive: true,
      image: AuthUser?.image,
    });

    if (!res.success) {
      setIsRegistering(false);
      return toast.error(res.error);
    }

    setIsRegistering(false);
    router.refresh();
    toast.success("অভিনন্দন প্রোফাইল সেটআপ সফল হয়েছে");
  };

  return (
    <>
      <section className="flex justify-center w-full">
        <div className="inline-flex justify-center py-20 pb-40 md:h-screen items-center px-5 flex-col w-full overflow-y-scroll">
          <div className="text-center pb-10 flex flex-col items-center">
            <h2 className="text-4xl">আপনার সকল তথ্য দিন</h2>
            <p className="font-extralight">
              আপনার প্রার্থনার সাথে সমস্ত তথ্য পূরণ করুন এবং আপনার সঠিক তথ্য
              প্রদান করুন।
            </p>
            <span className="w-20 h-1 rounded-xl bg-primary flex mt-5" />
          </div>
          <form
            id="accountSetUpForm"
            onSubmit={handleSubmit(handleUserRegister)}
            className="w-11/12 sm:w-10/12 md:w-[500px]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-5 pb-5">
              <Input
                disabled={isRegistering}
                {...register("name", { required: true })}
                defaultValue={AuthUser?.name}
                id="name-field"
                icon={<User strokeWidth={1} />}
                placeholder="আপনার নাম লিখুন"
                label="নাম"
                required={true}
              >
                {errors.name && (
                  <LineErro className={`pt-6`}>নাম প্রয়োজন</LineErro>
                )}
                {!errors.name && <LineErro className={`pt-6`}></LineErro>}
              </Input>
              <InputPass
                disabled={isRegistering}
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                  },
                })}
                id="password-field"
                required={true}
                icon={<Key strokeWidth={1} />}
                autoComplete="new-password"
                placeholder="সুরক্ষিত পাসওয়ার্ড দিন"
                label="পাসওয়ার্ড"
              >
                {errors.password && (
                  <LineErro className={`-mt-2`}>
                    {errors.password.message}
                  </LineErro>
                )}
              </InputPass>

              <Input
                disabled={isRegistering}
                {...register("dob")}
                id="dob-field"
                type="date"
                icon={<Calendar strokeWidth={1} />}
                label="জন্ম তারিখ"
              />
              <PhoneInput
                disabled={isRegistering}
                id="phone-field"
                label="ফোন নাম্বার"
                placeholder="আপনার সচল নাম্বার দিন"
                required={true}
                number={number}
                setNumber={setNumber}
              >
                {numberError && (
                  <LineErro className={`pt-6`}>
                    ফোন নাম্বার ১১ ডিজিট হতে হবে
                  </LineErro>
                )}
              </PhoneInput>
            </div>
            <button
              id="submit-button"
              disabled={isRegistering}
              type="submit"
              className={`bg-primary/80 hover:bg-primary transition-all group flex justify-center items-center gap-2 text-white px-5 w-full py-2 font-extralight rounded-md border border-primary mt-5 ${
                isRegistering && "cursor-not-allowed opacity-70"
              }`}
            >
              {isRegistering ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  পরবর্তী
                  <MoveRight className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all" />
                </>
              )}
            </button>
          </form>
          <button
            onClick={() => startNextStep("accountStepTour")}
            className="text-sky-800 underline mt-5 flex items-center gap-2"
          >
            <CircleHelp size={18} strokeWidth={2} />
            কিভাবে করবেন ?
          </button>
        </div>
      </section>
    </>
  );
}
