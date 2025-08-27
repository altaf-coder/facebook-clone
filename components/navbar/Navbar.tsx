"use client";
import React from "react";
import Searchinput from "./Search.input";
import NavbarLinks from "./NavLinks";
import ProfileModel from "../ProfileModel";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: user } = useCurrentUser();
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row items-center bg-white shadow-md w-full px-4 py-2 fixed top-0 z-50">
      <div className="flex items-center flex-[1] gap-2">
        <img src="/images/logo.png" alt="logo" className="h-10 w-10" />
        <Searchinput />
      </div>

      <div className="flex justify-center flex-[1]">
        <NavbarLinks />
      </div>
      <div className=" justify-end items-center flex-[1] hidden lg:flex">
        <img
          onClick={() => setIsOpen(true)}
          src={user?.profileImage || "/images/profile.webp"}
          alt="profile"
          className="h-10 w-10 rounded-full object-cover cursor-pointer"
        />
      </div>
      <ProfileModel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full h-35 flex flex-col mt-3 shadow-md ">
          <div className="flex flex-row items-center">
            <img
              src={user?.profileImage || "/images/profile.webp"}
              alt="profile"
              className="rounded-full ml-2 object-cover w-10 h-10"
            />
            <p className="font-bold ml-4">{user?.name}</p>
          </div>

          <div className="w-full h-px bg-gray-200 mt-6" />
          <button
            onClick={() => router.push(`/profile/${user?.id}`)}
            className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-full"
          >
            See your profile
          </button>
          <div
            className="flex flex-row items-center mt-20 cursor-pointer"
            onClick={() => signOut()}
          >
            <div className="rounded-full w-10 h-10 bg-gray-200 items-center justify-center flex">
              <FiLogOut size={20} className="text-red-500" />
            </div>
            <p className="ml-2 font-semibold">Log Out</p>
          </div>
        </div>
      </ProfileModel>
    </div>
  );
};

export default Navbar;
