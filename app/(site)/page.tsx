"use client";

import PostCard from "@/components/posts/PostCard";
import PostInput from "@/components/posts/PostInput";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

export default function Home() {
  const { data: posts } = usePosts();
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <div className="py-25 lg:py-15 overflow-y-scroll">
        <PostInput userId={currentUser?.id} />
      </div>
      {posts?.map((post: any) => (
        <PostCard
          key={post.id}
          id={post.user.id}
          name={post.user.name}
          profileImage={post.user.profileImage || "/images/profile.webp"}
          text={post.text}
          image={post.image}
          createdAt={post.createdAt}
          postId={post.id}
          commentLength={post?.comments?.length}
          currentUsername={currentUser?.name}
          likedBy={post?.likes?.map((like: any) => like.name)}
        />
      ))}
    </>
  );
}
