"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/getNotifications";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaBell,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import axios from "axios";
import { MdMenu } from "react-icons/md";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import ProfileModel from "../ProfileModel";

const NavbarLinks = () => {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const { data: notifications = [] } = useNotifications();

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const [hasSeenNotifications, setHasSeenNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Ref to track previous unreadCount
  const prevUnreadCountRef = useRef(unreadCount);

  useEffect(() => {
    if (pathname === "/notifications") {
      setHasSeenNotifications(true);
    }
  }, [pathname]);

  useEffect(() => {
    const prevUnreadCount = prevUnreadCountRef.current;

    // If unreadCount increased compared to previous, reset hasSeenNotifications to false
    if (unreadCount > prevUnreadCount) {
      setHasSeenNotifications(false);
    }

    prevUnreadCountRef.current = unreadCount;
  }, [unreadCount]);

  const showBadge = unreadCount > 0 && !hasSeenNotifications;

  const linkClass = (path: string) =>
    pathname === path
      ? "relative flex flex-col items-center text-blue-600 border-b-[3px] border-blue-600 px-4 lg:px-8 pb-1"
      : "relative flex flex-col items-center text-gray-500 px-4 pb-1";

  return (
    <nav className="flex gap-6 lg:gap-30 items-center bg-white py-2 relative">
      <Link href="/" className={linkClass("/")}>
        <FaHome size={26} />
      </Link>

      <Link href="/friends" className={linkClass("/friends")}>
        <FaUserFriends size={26} />
      </Link>

      <Link href="/notifications" className={linkClass("/notifications")}>
        <div className="relative">
          <FaBell size={26} />
          {showBadge && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </Link>

      <Link
        href={`/profile/${user?.id}`}
        className={linkClass(`/profile/${user?.id}`)}
      >
        <FaUserCircle size={26} />
      </Link>
      <MdMenu
        size={26}
        className="lg:hidden flex"
        onClick={() => setIsOpen(true)}
      />
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
    </nav>
  );
};

export default NavbarLinks;
