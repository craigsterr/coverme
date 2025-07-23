"use client";
import "animate.css";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Image from "next/image";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const textColor = "text-white/75";
  const linkStyle = ` text-lg lg:text-xl font-medium px-2 py-1 rounded-2xl ${
    pathname === "/contact"
      ? `bg-gray-300 ${textColor}`
      : `my-auto ${textColor} bg-gray-300/0 hover:bg-white/75 transition-all duration-300 hover:text-black`
  }`;

  return (
    <>
      <nav
        className="fixed w-full max-w-[75%] z-10 mt-3 px-4 py-2 rounded-3xl border
                border-white/20 shadow-xl bg-gradient-to-br from-white/20 via-white/5 to-white/10 backdrop-blur-md"
      >
        <div className="flex justify-between max-w-7xl mx-auto ">
          <div className="flex gap-2 ml-5">
            {/* <Image
              src={"/logo.png"}
              alt={"logo"}
              width={25}
              height={50}
              className="invert my-auto"
            /> */}
            <Link
              href="/"
              className={
                "text-2xl lg:text-xl font-bold flex items-center " + textColor
              }
            >
              coverme
            </Link>
          </div>
          {/* Menu toggle button - visible on small screens */}
          <button
            className={
              "text-xl md:hidden bg-transparent cursor-pointer mr-5 " +
              textColor
            }
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Navigation links */}
          <div
            className={`${
              isOpen ? "flex animate__animated animate__fadeInDown" : "hidden"
            } flex-col gap-2 mt-4 md:flex md:flex-row md:gap-4 md:mt-0 mr-5`}
          >
            <Link
              href="#upload"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              upload
            </Link>
            <Link
              href="#add-job"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              add job
            </Link>
            <Link
              href="#jobs"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              jobs
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
