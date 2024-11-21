// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Authenticate the user via your prisma client
        const data = await prisma.creator.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        const isPasswordCorrect = await bcrypt.compare(credentials?.password as string, data?.password as string);

        // If login is successful, return the user object (with role)
        if (data && isPasswordCorrect) {
          return { id: data.id, name: data.name, email: data.email, username: data.username };
          // { id, name, email, username }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT-based sessions
    maxAge: 30 * 24 * 60 * 60, // Set session to expire after 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role from user to token
      if (user) {
        token.username = user.username;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role from token to session
      session.user.username = token.username;
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// initialize NextAuth

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
