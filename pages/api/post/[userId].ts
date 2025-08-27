import getCurrentUser from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const posts = await prisma.post.findMany({
      where: {
        user: {
          id: userId,
        },
      },
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
        comments: {
          select: {
            body: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                profileImage: true,
                id: true,
                coverImage: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
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
