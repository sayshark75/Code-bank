import dbConnect from "@/libs/mongoose";
import SnippetsModel from "@/models/SnippetModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const snippets = await SnippetsModel.find({});
    return NextResponse.json({ message: "Retrival of snippets success", success: true, data: snippets });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", success: false, error }, { status: 400 });
  }
}
