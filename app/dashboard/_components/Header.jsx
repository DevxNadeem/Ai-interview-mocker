"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-screen-xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-2xl mt-4 mx-4 lg:mx-auto shadow-xl shadow-black/10">
        {/* Logo */}
        <Image src={"/logo.svg"} width={140} height={80} alt="logo" />
        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          <Link href="/dashboard">
            <li
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                path === "/dashboard"
                  ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <li
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
              path === "/dashboard/questions"
                ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            Questions
          </li>
          <Link href="/dashboard/upgrade">
            <li
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                path === "/dashboard/upgrade"
                  ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Upgrade
            </li>
          </Link>
          <li
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
              path === "/dashboard/how"
                ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            How it Works?
          </li>
        </ul>
        {/* User Button */}
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transform"
          >
            Get Started
          </a>
          <UserButton />
        </div>
      </div>
    </div>
  );
}
export default Header;
