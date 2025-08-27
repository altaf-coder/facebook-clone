"use client";
interface PostInputProps {
  userId?: string;
}
import { MdPhoto } from "react-icons/md";
import useCurrentUser from "@/hooks/useCurrentUser";
import { use, useState } from "react";
import PostModel from "./PostModel";
import PostUpload from "./PostUpload";
import { useRouter } from "next/navigation";
import axios from "axios";

const PostInput: React.FC<PostInputProps> = ({ userId }) => {
  const { data: user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [text, setText] = useState("");
  const [image, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("/api/create.post", { text, image })
      .then(() => {
        setText("");
        setImage(undefined);
        setIsOpen(false);
        router.refresh();
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between space-x-4 flex-wrap md:flex-nowrap cursor-pointer">
        <img
          onClick={() => router.push(`/profile/${userId}`)}
          src={user?.profileImage || "/images/profile.webp"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-600 min-w-[150px] cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          What's on mind?
        </div>
        <div
          className="flex items-center space-x-1 text-blue-500 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <MdPhoto className="w-5 h-5" />
          <span className="text-sm font-medium">Photo</span>
        </div>
      </div>
      <PostModel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1 className="text-2xl font-bold text-center">Create Post</h1>
        <div className="border-t border-gray-300 mt-5" />
        <div className="flex flex-row">
          <img
            src={user?.profileImage || "/images/profile.webp"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mt-4"
          />
          <p className="mt-4 ml-2 font-bold text-sm">{user?.name}</p>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`What’s on your mind ${user?.name} ?`}
          className="w-full focus:outline-none border-none placeholder-gray-500 mt-4"
        />
        <div className="border border-gray-300 rounded-md px-4 py-13 lg:py-25  mt-5 items-center justify-center">
          <PostUpload onChange={setImage} label="Upload Photo" />
        </div>

        <button
          disabled={isLoading || (!text && !image)}
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md shadow-md mt-2 lg:mt-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </PostModel>
    </div>
  );
};
export default PostInput;
