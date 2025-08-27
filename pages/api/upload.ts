import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { profileImage, coverImage } = req.body;
  const currentUser = await getCurrentUser(req, res);
  if (!currentUser?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const upload = await prisma.user.update({
      where: {
        email: currentUser?.email,
      },
      data: {
        profileImage: profileImage,
        coverImage: coverImage,
      },
    });
    return res.status(200).json(upload);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
