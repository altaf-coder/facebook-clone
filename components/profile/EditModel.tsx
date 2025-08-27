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
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-opacity justify-center items-center duration-300"
          onClick={onClose} // Optional: close modal when clicking outside
        />
      )}

      {/* Modal */}
      <div
        className={`
          fixed top-1/2 left-1/2 z-50
          w-80 lg:w-150 max-w-md h-150 lg:h-200 rounded-lg bg-white shadow-lg overflow-hidden
          transform transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-[-50%] translate-y-[-50%]"
              : "translate-x-[300%] translate-y-[-50%]"
          }
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
    </>
  );
};

export default ProfileModel;
