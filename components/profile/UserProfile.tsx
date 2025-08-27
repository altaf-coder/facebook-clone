import Image from "next/image";
import React from "react";
import { FaCamera } from "react-icons/fa";

interface ProfileHeaderProps {
  coverImage?: string;
  profileImage?: string;
  name: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverImage,
  profileImage,
  name,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Cover Image or Placeholder */}
      <div className="w-full h-64 relative rounded-md overflow-hidden bg-neutral-200">
        {coverImage ? (
          <Image src={coverImage} alt="Cover" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg">
            No Cover Image
            <FaCamera className="ml-2" />
          </div>
        )}
      </div>

      {/* Profile Image or Placeholder */}
      <div className="absolute -bottom-16 left-6 flex items-center space-x-4">
        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg relative flex items-center justify-center">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover"
            />
          ) : (
            <FaCamera className="text-gray-500 w-10 h-10" />
          )}
        </div>
        <h2 className="text-xl lg:text-2xl font-semibold lg:font-bold drop-shadow-lg mt-15">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default ProfileHeader;
