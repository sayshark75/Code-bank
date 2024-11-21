import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { favoriteId, creatorId, snippetId } = body;

    if (!creatorId || !snippetId) {
      return new Response(
        JSON.stringify({
          message: "Creator ID and Snippet ID are required.",
          status: false,
        }),
        { status: 400 }
      );
    }

    let result;
    if (favoriteId) {
      // If `favoriteId` exists, delete the favoriteSnippet
      result = await prisma.favoriteSnippet.delete({
        where: { id: favoriteId },
      });
      return new Response(
        JSON.stringify({
          message: "Snippet removed from favorites.",
          status: true,
          data: result,
        })
      );
    } else {
      // If `favoriteId` doesn't exist, create a new favoriteSnippet
      result = await prisma.favoriteSnippet.create({
        data: {
          creatorId,
          snippetId,
        },
      });
      return new Response(
        JSON.stringify({
          message: "Snippet added to favorites.",
          status: true,
          data: result,
        })
      );
    }
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        status: false,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
