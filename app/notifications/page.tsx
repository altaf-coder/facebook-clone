"use client";
import useNotifications from "@/hooks/getNotifications";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import useComments from "@/hooks/useComments";

const Page = () => {
  const { data: getNotifications } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50 py-28 lg:py-20 flex justify-center">
      <div className="w-full max-w-md">
        {getNotifications?.length === 0 ? (
          <p className="text-center text-gray-500">No notifications</p>
        ) : (
          getNotifications?.map((notification: any) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-4 border-b bg-white hover:bg-gray-100 transition rounded-lg shadow-sm"
            >
              <img
                src={notification.user?.profileImage || "/images/profile.webp"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-800">{notification.body}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
