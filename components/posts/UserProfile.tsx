import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  const { data: user } = useCurrentUser();
  return (
    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg relative flex items-center justify-center">
      <Image
        src={user?.profileImage || "/images/profile.webp"}
        alt="Profile"
        width={128}
        height={128}
        className="object-cover"
      />
    </div>
  );
};

export default UserProfile;
