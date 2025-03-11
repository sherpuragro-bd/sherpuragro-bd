"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function NewLink({ className, children, href, ...props }) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = (e) => {
    if (href === window.location.pathname) {
      return;
    }
    if (isRedirecting) return e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  };

  useEffect(() => {
    setIsRedirecting(false);
  }, [window.location.pathname]);

  const loader = (
    <AnimatePresence>
      {isRedirecting && (
        <>
          <motion.div
            initial={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full justify-center fixed top-0 py-5 rounded-b-[600%] z-[99999999] left-0"
          >
            <div className="p-3 border border-primary/20 bg-white shadow-lg rounded-full">
              <Loader2 size={35} className="text-primary animate-spin" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {typeof window !== "undefined" && createPortal(loader, document.body)}

      <Link
        href={href}
        onClick={handleClick}
        className={`${className || ""} ${
          isRedirecting ? "pointer-events-none opacity-70" : ""
        }`}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}
