import dbConnect from "@/libs/mongoose";
import SnippetsModel from "@/models/SnippetModel";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const snippets = await SnippetsModel.find({ title: { $regex: body.query, $options: "i" } });

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
