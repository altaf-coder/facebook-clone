import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { postId } = req.query;
    if (!postId || typeof postId !== "string") throw new Error("Invalid ID");
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: {
            name: true,
            profileImage: true,
            id: true,
            coverImage: true,
          },
        },
      },
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
