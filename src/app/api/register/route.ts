import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.password.length < 8) {
      return Response.json({
        message: "Password must be at least 8 characters long",
        success: false,
        data: null,
      });
    }

    if (body.password !== body.confirm_password) {
      return Response.json({
        message: "Passwords do not match",
        success: false,
        data: null,
      });
    }

    if (body.email === "" || body.password === "" || body.username === "" || body.name === "") {
      return Response.json({
        message: "All fields are required",
        success: false,
        data: null,
      });
    }

    const user = await prisma.creator.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return Response.json({
        message: "Creator already exists",
        success: false,
        data: null,
      });
    }

    // encrypt password using bcrypt and salt 4 rounds
    const hashedPassword = await bcrypt.hash(body.password, 4);

    const newUser = await prisma.creator.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      include: {
        snippets: true,
        comments: true,
        likes: true,
        favorites: true,
      },
    });

    return Response.json({
      message: "Creator registered successfully",
      success: true,
      data: newUser,
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
