"use client";
interface Props {
  isOwn?: boolean;
}
import React, { useCallback } from "react";
import { FaPencilAlt } from "react-icons/fa";
import EditModel from "./EditModel";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import useCurrentUser from "@/hooks/useCurrentUser";

const EditButton: React.FC<Props> = ({ isOwn }) => {
  const { data: user } = useCurrentUser();
  const [isOpen, setisOpen] = React.useState(false);
  const [image, setImage] = React.useState<string>();
  const [coverimage, setcoverImage] = React.useState<string>();

  const onSubmit = async () => {
    try {
      await axios.post("/api/upload", {
        profileImage: image,
        coverImage: coverimage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isOwn && (
        <div
          className="w-full flex justify-end pr-6 mt-4 ml-2 lg:ml-0"
          onClick={() => setisOpen(true)}
        >
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            <FaPencilAlt className="w-4 h-4" />
            <span className="text-sm font-medium">Edit Profile</span>
          </button>
        </div>
      )}

      <EditModel isOpen={isOpen} onClose={() => setisOpen(false)}>
        <div className="space-y-4 relative pb-20">
          <h1 className="text-xl font-bold">Profile Image</h1>
          <ImageUpload
            onChange={setImage}
            label={user?.profileImage}
            variant="profile"
          />
          <h1 className="text-xl font-bold">Cover Image</h1>
          <ImageUpload
            onChange={setcoverImage}
            label="Upload Cover Image"
            variant="cover"
          />

          {/* Button Container */}
          <div className="absolute bottom-4 right-4 flex gap-3">
            <button
              onClick={onSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Save
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              onClick={() => setisOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </EditModel>
    </>
  );
};

export default EditButton;
