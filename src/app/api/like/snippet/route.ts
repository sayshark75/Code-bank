import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Adjust the import to match your prisma client setup

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { snippetId, creatorId, isLiked } = body;

    if (!snippetId || !creatorId) {
      return NextResponse.json({ error: "Snippet ID and Creator ID are required." }, { status: 400 });
    }

    if (isLiked) {
      // Unlike the snippet (remove the like)
      await prisma.like.deleteMany({
        where: {
          snippetId,
          creatorId,
        },
      });

      return NextResponse.json({ message: "Successfully unliked the snippet." });
    } else {
      // Like the snippet (add a new like)
      await prisma.like.create({
        data: {
          snippetId,
          creatorId,
        },
      });

      return NextResponse.json({ message: "Successfully liked the snippet." });
    }
  } catch (error) {
    console.error("Error in /api/like route:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
