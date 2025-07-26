"use client";
import "animate.css";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const textColor = "text-white/75";
  const linkStyle = ` text-lg lg:text-xl font-medium px-2 py-1 rounded-2xl ${
    pathname === "/contact"
      ? `bg-gray-300 ${textColor}`
      : `my-auto ${textColor} bg-gray-300/0 hover:bg-white/75 transition-all duration-300 hover:text-black`
  }`;

  const links = [
    { name: "upload", link: "#upload" },
    { name: "add job", link: "#add-job" },
    { name: "jobs", link: "#jobs" },
  ];

  return (
    <>
      <nav
        className="fixed w-full sm:max-w-[75%] z-20 sm:mt-3 px-4 py-2 sm:rounded-3xl sm:border-2 bg-purple-600/50
                border-white/20 shadow-xl/50 bg-gradient-to-br from-white/20 via-white/5 to-white/10 backdrop-blur-md"
      >
        <div className="flex sm:flex-row justify-between max-w-7xl mx-auto z-30">
          <div className="flex gap-2 ml-5">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt={"logo"}
                width={50}
                height={50}
                className="invert my-auto flex sm:hidden"
              />
            </Link>
            <Link
              href="/"
              className={
                "text-2xl lg:text-xl font-bold items-center sm:flex hidden " +
                textColor
              }
            >
              coverme
            </Link>
          </div>

          {/* Menu toggle button - visible on small screens */}
          <button
            className={
              "text-lg sm:hidden bg-transparent cursor-pointer mr-5 " +
              textColor
            }
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>

          {/* Desktop links */}
          <div className="hidden sm:flex sm:flex-row sm:gap-4 mr-5">
            {links.map((link) => (
              <Link key={link.link} href={link.link} className={linkStyle}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer menu */}
      <div
        className={`fixed top-0 border-2 border-white/20 right-0 h-full w-1/2 max-w-xs backdrop-blur-md bg-white/15 text-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-3 gap-4">
          <button
            className="text-white text-2xl self-end cursor-pointer mr-4"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <div className="space-y-10">
            {links.map((link) => (
              <div key={link.link} className="flex flex-col">
                <Link
                  href={link.link}
                  className="text-lg font-medium mx-auto p-5 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                <div className="h-[1px] bg-white/20 mb-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
