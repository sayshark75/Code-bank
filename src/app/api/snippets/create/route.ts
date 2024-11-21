import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const snippets = await prisma.codeSnippet.create({
      data: {
        title: body.title,
        description: body.description,
        code: body.code,
        creatorId: body.creatorId,
        language: body.language,
        tags: body.tags,
        version: body.version,
      },
    });

    return Response.json({
      message: "Snippet created successfully",
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
