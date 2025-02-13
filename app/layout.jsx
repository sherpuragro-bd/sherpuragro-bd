import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import "./globals.css";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import ScrollToTop from "./components/ui/ScrolltoTop";

const liAdorNoirrit = localFont({
  src: "../public/fonts/adornoirit.ttf",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "শেরপুর এগ্রো",
  description: "শেরপুর এগ্রো বাংলাদেশি একটি এগ্রো প্লাটফর্ম",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${liAdorNoirrit.className} antialiased text-1 bg-white [&::-webkit-scrollbar]:w-0`}
      >
        <Header />
        {children}
        <Toaster
          toastOptions={{
            style: {
              zIndex: "9999999999999999999999999 !important",
            },
            className: "!border !shadow-none !px-5",
            success: {
              iconTheme: {
                primary: "#3bb77e",
              },
            },
          }}
        />
        <ScrollToTop />
      </body>
    </html>
  );
}
