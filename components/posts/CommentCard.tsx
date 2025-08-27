import React from "react";
import { formatDistanceToNow } from "date-fns";

type CommentCardProps = {
  userImage: string;
  name: string;
  comment: string;
  createdAt: Date;
};

const CommentCard: React.FC<CommentCardProps> = ({
  userImage,
  name,
  comment,
  createdAt,
}) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm max-w-xl">
      <img
        src={userImage}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-xl px-4 py-2">
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-sm">{comment}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
