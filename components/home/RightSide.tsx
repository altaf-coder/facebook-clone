import useOhterUsers from "@/hooks/useOtherUsers";
import { useRouter } from "next/navigation";
import React from "react";

const RightSide = () => {
  const { data: otherUsers } = useOhterUsers();
  const router = useRouter();
  return (
    <>
      {otherUsers?.map((user: any) => (
        <div
          className="p-4 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out py-20 items-center flex flex-col "
          key={user.id}
          onClick={() => router.push(`/profile/${user.id}`)}
        >
          <div className="text-lg font-semibold mb-4 text-gray-500">
            Find Friends
          </div>
          <div className="flex items-center space-x-3">
            <img
              src={user?.profileImage || "/images/profile.webp"}
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-base font-medium ml-4">{user?.name}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default RightSide;
