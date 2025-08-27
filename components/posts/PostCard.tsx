"use client";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostCardProps {
  name: string;
  profileImage: string;
  text: string;
  image?: string;
  createdAt: string; // ISO string
  id?: string;
  likedBy?: string[]; // Optional array of usernames who liked the post
  postId?: string;
  commentLength?: number;
  comment?: string;
  currentUsername?: string;
}

export default function PostCard({
  name,
  profileImage,
  text,
  image,
  createdAt,
  id,
  likedBy = [],
  postId,
  commentLength,
  currentUsername,
}: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: currentUser } = useCurrentUser();

  const hasLiked = likedBy.includes(currentUser?.name!);
  const others = likedBy.filter((username) => username !== currentUser?.name);
  const displayUsers = others.slice(0, 2);
  const likeSound = new Audio("/like.mp3");

  useEffect(() => {
    if (likedBy.includes(currentUsername!)) {
      setLiked(true);
    }
  }, [likedBy]);

  const handleLike = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/like", { postId });
      if (res.data.message === "Post liked") {
        setLiked(true);
        likeSound.play();
      } else {
        setLiked(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 max-w-xl mx-auto border border-gray-200">
      {/* Top: profile + name + time */}
      <div className="flex items-start mb-3">
        <img
          src={profileImage || "/images/profile.webp"}
          className="w-10 h-10 rounded-full object-cover"
          alt={name}
          onClick={() => router.push(id ? `/profile/${id}` : "")}
        />
        <div className="ml-3">
          <Link
            href={id ? `/profile/${id}` : ""}
            className="font-semibold text-blue-600 hover:underline block"
          >
            {name}
          </Link>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
      </div>

      {/* Post text */}
      <p className="text-gray-800 mb-2">{text}</p>

      {/* Post image */}
      {image && (
        <div className="mt-2">
          <Image
            src={image}
            alt="Post image"
            width={600}
            height={400}
            className="rounded-xl object-cover w-full max-h-[500px]"
          />
        </div>
      )}

      {/* Like summary */}
      {likedBy.length > 0 && (
        <div className="text-sm text-gray-600 mt-3 px-2">
          <p>
            Liked by {hasLiked && <span className="font-semibold">You</span>}
            {hasLiked && displayUsers.length > 0 && ", "}
            {displayUsers.map((user, idx) => (
              <span key={user}>
                <span className="font-semibold">{user}</span>
                {idx < displayUsers.length - 1 ? ", " : ""}
              </span>
            ))}
            {others.length > 2 && ` and ${others.length - 2} others`}
          </p>
        </div>
      )}

      {/* Like & Comment Buttons */}
      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-around text-gray-600 text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-4 py-2 rounded hover:bg-gray-100 transition ${
            liked ? "text-blue-600 font-semibold" : "text-gray-500"
          }`}
          disabled={loading}
        >
          <ThumbsUp size={16} />
          Like
        </button>

        <button
          className="flex items-center gap-1 px-4 py-2 rounded hover:bg-gray-100 transition"
          onClick={() => router.push(`/post/${postId}`)}
        >
          <span className="text-xs text-gray-500">{commentLength}</span>
          <MessageCircle size={16} />
          Comment
        </button>
      </div>
    </div>
  );
}
