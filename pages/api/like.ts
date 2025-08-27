import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const currentUser = await getCurrentUser(req, res);

  if (!currentUser || !currentUser.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { postId } = req.body;

  if (!postId || typeof postId !== "string") {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { likes: true },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const alreadyLiked = post.likes.some((user) => user.id === currentUser.id);

    if (alreadyLiked) {
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: {
            disconnect: { id: currentUser.id },
          },
        },
      });
      return res.status(200).json({ message: "Post unliked" });
    } else {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { user: true },
      });
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: {
            connect: { id: currentUser.id },
          },
        },
      });
      if (post?.user.email !== currentUser.email) {
        await prisma.notification.create({
          data: {
            body: `${currentUser.name} Liked your post.`,
            user: { connect: { id: post?.user.id } },
          },
        });
      }
      return res.status(200).json({ message: "Post liked" });
    }
  } catch (error) {
    console.error("Like API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
