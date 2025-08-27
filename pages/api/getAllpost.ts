import getCurrentUser from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        user: {
          select: {
            name: true,
            profileImage: true,
            id: true,
            coverImage: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
