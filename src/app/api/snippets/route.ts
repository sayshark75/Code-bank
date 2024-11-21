import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, isFavorite, creatorId } = body;

    const snippets = await prisma.codeSnippet.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
        ...(isFavorite === "true" && {
          favorites: {
            some: {
              creatorId,
            }, // Adjust condition if necessary to match your schema
          },
        }),
      },
      include: {
        comments: true,
        creator: true,
        favorites: true,
        likes: true,
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
        data: [],
        error,
      },
      { status: 400 }
    );
  }
}
