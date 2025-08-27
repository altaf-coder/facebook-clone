import React from "react";
import { FaTimes } from "react-icons/fa";

interface ProfileModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModel: React.FC<ProfileModelProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`
        fixed top-18 right-4 rounded-lg h-80 w-80 max-w-md bg-white overflow-hidden shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-[110%]"} 
      `}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <FaTimes size={20} />
      </button>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default ProfileModel;
