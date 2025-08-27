"use client";
import PostCard from "@/components/posts/PostCard";
import EditButton from "@/components/profile/EditButton";
import UserProfile from "@/components/profile/UserProfile";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  type Params = {
    id: string;
  };
  const params = useParams<Params>();
  const id = params?.id;

  const { data: posts } = usePost(id);
  const { data: user } = useUser(id);
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = user?.id === currentUser?.id;

  return (
    <>
      <UserProfile
        name={user?.name || ""}
        coverImage={user?.coverImage || ""}
        profileImage={user?.profileImage || "/images/profile.webp"}
      />
      <EditButton isOwn={isCurrentUser} />
      {posts?.map((post: any) => (
        <div className="mt-22" key={post.id}>
          <PostCard
            key={post.id}
            // id={post.id}
            name={post.user.name}
            profileImage={post.user.profileImage || "/images/profile.webp"}
            text={post.text}
            image={post.image}
            createdAt={post.createdAt}
            commentLength={post?.comments?.length}
            postId={post.id}
            currentUsername={currentUser?.name}
            likedBy={post?.likes?.map((like: any) => like.name)}
          />
        </div>
      ))}
    </>
  );
};

export default page;
