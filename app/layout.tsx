"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Facebook Clone",
//   description:
//     "Get connected with friends and the world around you on Facebook.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const show = pathname !== "/auth";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex overflow-hidden`}
      >
        <Toaster />
        {show && <Navbar />}
        {show && (
          <div className="w-[32%] bg-gray-100 p-4 hidden lg:block">
            <LeftSide />
          </div>
        )}
        {show ? (
          <div className="w-full lg:w-[36%] bg-white lg:shadow-2xl overflow-y-scroll">
            {children}
          </div>
        ) : (
          <div>{children}</div>
        )}
        {show && (
          <div className="w-[32%] bg-gray-100 p-4 hidden lg:block">
            <RightSide />
          </div>
        )}
      </body>
    </html>
  );
}
