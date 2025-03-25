import Image from "next/image";
import FooterBanner from "../../../public/img/footerbanner.png";
import SubscribeNewsletter from "../ui/SubscribeNewsletter";
import FooterImage from "../../../public/img/footerImage.png";
import FreeDeliveryIcon from "../../../public/img/fastdelivery.png";
import CustomerSupportIcon from "../../../public/img/customersupport.png";
import SecurePaymentIcon from "../../../public/img/securepayment.png";
import OrderReturnIconm from "../../../public/img/orderreturn.png";
import { LinkHighLight } from "../ui/LinkHighLight";
import { Link, PhoneCall } from "lucide-react";
import { HeaderData } from "@/data/Header";
import { convertToBengaliNumbers } from "@/lib/utils";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

const FooterFeturesData = [
  {
    icon: FreeDeliveryIcon,
    title: "ফ্রী ডেলিভারি",
    des: "৫০০০ টাকা অধিক অর্ডারে ফ্রী ডেলিভারি",
  },
  {
    icon: CustomerSupportIcon,
    title: "কাস্টমার সাপোর্ট",
    des: "২৪/৭ কাস্টমার সাপোর্ট সেবা",
  },
  {
    icon: SecurePaymentIcon,
    title: "নিরাপদ পেমেন্ট",
    des: " SSLCOMMERZ নিরাপদ পেমেন্ট",
  },
  {
    icon: OrderReturnIconm,
    title: "অর্ডার রিটার্ন ",
    des: "৭ দিনের মধ্যে প্রোডাক্ট রিটার্ন সুবিধা",
  },
];

const Footer = () => {
  return (
    <footer className="flex justify-center pb-24 sm:pb-0">
      <div className="max-w-[1440px] w-full px-5">
        <div className="relative w-full rounded-2xl overflow-hidden">
          <Image
            src={FooterBanner}
            alt="Footer Banner"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
            priority
          />
          <div className="flex flex-col lg:flex-row items-center p-10 md:p-20 xl:py-10 z-30 relative">
            <div className="w-full lg:w-8/12 space-y-5">
              <div className="w-full lg:w-9/12 space-y-8">
                <h2 className="text-4xl sm:text-5xl z-30">
                  ঘরে বসে আপনার পছন্দের পণ্য অর্ডার করুন
                </h2>
                <p className="font-light">
                  আপনি কোনও ঝামেলা ছাড়াই আপনার নিজের ঘরে বসেই আপনার পছন্দের
                  পণ্যগুলি সহজেই অর্ডার করতে পারেন। বিভিন্ন ধরণের আইটেম অন্বেষণ
                  করুন এবং সেগুলি সরাসরি আপনার দোরগোড়ায় পৌঁছে দিন।
                </p>
              </div>
              <SubscribeNewsletter className="!w-full md:!w-7/12" />
            </div>
            <div className="w-full lg:w-6/12 lg:block hidden">
              <Image alt="Footer Image" src={FooterImage} />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 gap-5">
          {FooterFeturesData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 md:flex-col lg:flex-row md:text-center lg:text-start bg-slate-100 space-x-3 rounded-xl hover:-translate-y-2 cursor-pointer ease-linear transition-all border p-5"
            >
              <div>
                <Image className="w-[50px]" src={item.icon} alt={item.title} />
              </div>
              <div>
                <h4 className="text-lg">{item.title}</h4>
                <p className="text-sm font-light">{item.des}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-5 w-full py-10 border items-center mt-10 justify-between">
          <p>
            কপিরাইট © {convertToBengaliNumbers(new Date().getFullYear())}{" "}
            <LinkHighLight href="/">শেরপুর এগ্রো</LinkHighLight> সর্বস্বত্ব
            সংরক্ষিত
          </p>
          <div className="flex gap-3 items-center">
            <PhoneCall size={30} strokeWidth={1} />
            <div>
              <LinkHighLight
                href={`tel:${HeaderData.headerPhone.phone}`}
                className="text-lg"
              >
                {convertToBengaliNumbers(HeaderData.headerPhone.phone)}
              </LinkHighLight>
              <p className="font-light -mt-2">২৪/৭ কাস্টমার সাপোর্ট</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const socialMediaLinks = [
  {
    icon: FaFacebookF,
    name: "Facebook",
    link: "https://www.facebook.com/sherpuragrobd",
  },
  {
    icon: FaWhatsapp,
    name: "Whatsapp",
    link: `https://wa.me/${HeaderData.headerPhone.phone.split(" ").join("")}`,
  },
];
