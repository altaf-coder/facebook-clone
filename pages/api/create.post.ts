import getCurrentUser from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser(req, res);
  if (!currentUser?.email)
    return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "POST") return res.status(405).end();
  const { text, image } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        text: text,
        image: image,
        user: {
          connect: {
            email: currentUser?.email,
          },
        },
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Something went wrong in creating post" });
  }
}
