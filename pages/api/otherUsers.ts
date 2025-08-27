import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/getCurrentUser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const currentUser = await getCurrentUser(req, res);
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: currentUser?.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Something went wrong in fetching users" });
  }
}
