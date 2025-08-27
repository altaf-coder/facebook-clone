"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import useComments from "@/hooks/useComments";
import CommentCard from "@/components/posts/CommentCard";

export default function CommentInput() {
  type Params = {
    postId: string;
  };
  const params = useParams<Params>();
  const postId = params?.postId;

  if (!postId) return null;

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: comments } = useComments(postId);

  const handleSend = async () => {
    setLoading(true);
    await axios
      .post("/api/comment", { body, postId })
      .then(() => {
        setBody("");
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-white pb-20 ">
      {/* Comments aligned to the left with margin at top */}
      <div className=" mt-25 lg:mt-15 ml-4 max-w-2xl flex flex-col gap-4">
        {comments?.map((comment: any) => (
          <CommentCard
            key={comment.id}
            comment={comment.body}
            name={comment.user.name}
            createdAt={comment.createdAt}
            userImage={comment.user.profileImage || "/images/profile.webp"}
          />
        ))}
      </div>

      {/* Fixed comment input at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-md">
        <div className="flex items-end gap-2 max-w-2xl mx-auto">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment..."
            rows={1}
            className="flex-1 resize-none bg-gray-100 rounded-[999px] px-4 py-2 text-sm border-none focus:outline-none focus:ring-0 min-h-[40px]"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`p-2 transition-colors rounded-full ${
              body.trim()
                ? "text-blue-500 hover:bg-blue-100"
                : "text-gray-400 cursor-default"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
