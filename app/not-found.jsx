import Image from "next/image";
import NotFoundImgURI from "../public/img/notfound.png";
import Br from "./components/ui/Br";
import NewLink from "./components/ui/NewLink";

export default function NotFound() {
  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-primary px-5 py-40 h-screen flex justify-center items-center">
          <div className="flex text-center flex-col items-center gap-5">
            <Image
              src={NotFoundImgURI}
              alt="Not Found Page"
              width={350}
              placeholder="blur"
            />
            <h2 className="text-2xl md:text-4xl">
              দুঃখিত পৃষ্ঠাটি খুঁজে পাওয়া যাইনি
            </h2>
            <p className="text-neutral-400 font-light text-center">
              আপনার ক্লিক করা লিঙ্কটি হয়তো নষ্ট হয়ে গেছে অথবা পৃষ্ঠাটি সরিয়ে
              ফেলা হয়েছে। <Br /> সমস্যা সম্পর্কে{" "}
              <NewLink className="text-primary hover:underline" href={`/`}>
                হোমপেজে
              </NewLink>{" "}
              যান অথবা আমাদের সাথে{" "}
              <NewLink className="text-primary hover:underline" href={`/`}>
                যোগাযোগ
              </NewLink>{" "}
              করুন।
            </p>
            <NewLink
              href={`/`}
              className="bg-primary text-white px-5 py-2 hover:bg-primary/70 rounded-md"
            >
              হোম পেজে ফিরে জান
            </NewLink>
          </div>
        </div>
      </section>
    </>
  );
}
