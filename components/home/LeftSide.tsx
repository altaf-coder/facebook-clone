"use client";
import React from "react";
import { Users } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const LeftSide = () => {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  return (
    <div className="flex flex-col items-start p-4  w-64 py-20">
      <div
        className="flex items-center mb-4 cursor-pointer"
        onClick={() => router.push(`/profile/${user?.id}`)}
      >
        <img
          src={user?.profileImage || "/images/profile.webp"}
          alt="Facebook Profile"
          className="w-10 h-10 rounded-full object-cover shadow-md mr-3"
        />
        <h2 className="text-md font-semibold">{user?.name}</h2>
      </div>

      <div
        className="flex items-center text-gray-600 text-sm font-medium mt-5 cursor-pointer"
        onClick={() => router.push("/friends")}
      >
        <Users className="text-blue-600 w-5 h-5 mr-2" />
        Friends
      </div>
    </div>
  );
};

export default LeftSide;
