import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { snippetId, creatorId, isLiked } = await req.json();

    // Validate required fields
    if (!snippetId || !creatorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (isLiked) {
      // Unlike logic
      await prisma.like.deleteMany({
        where: { snippetId, creatorId },
      });
    } else {
      // Like logic
      await prisma.like.create({
        data: { snippetId, creatorId },
      });
    }

    return NextResponse.json({ message: "Like status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating like status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
