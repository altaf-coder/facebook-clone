// /pages/api/notifications.ts
import getCurrentUser from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const currentUser = await getCurrentUser(req, res);
  if (!currentUser) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: currentUser.id },
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json("Internal Server Error");
  }
}
