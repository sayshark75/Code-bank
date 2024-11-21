// types/next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default `User` and `Session` types to include `role`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
    };
  }

  interface User {
    id: string;
    name: string;
    username: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    name: string;
    email: string;
  }
}
