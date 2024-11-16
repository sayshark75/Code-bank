import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const snippets = await prisma.snippets.findMany({
      where: {
        title: {
          contains: body.query,
          mode: "insensitive",
        },
      },
    });

    return Response.json({
      message: "Retrieval of snippets success",
      success: true,
      data: snippets,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Internal Server Error",
        success: false,
        error,
      },
      { status: 400 }
    );
  }
}
