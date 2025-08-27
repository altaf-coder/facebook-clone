import getCurrentUser from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const currentUser = await getCurrentUser(req, res);
  if (!currentUser) {
    return res.status(400).json("unauthorized");
  }
  try {
    const { body, postId } = req.body;
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    if (!post) {
      return res.status(404).json("Post not found");
    }
    const comment = await prisma.comment.create({
      data: {
        body: body,
        user: { connect: { email: currentUser?.email } },
        post: { connect: { id: postId } },
      },
    });
    if (post.user.email !== currentUser.email) {
      await prisma.notification.create({
        data: {
          body: `${currentUser.name} commented on your post.`,
          user: { connect: { id: post.user.id } },
        },
      });
    }
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
