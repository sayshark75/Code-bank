"use client";
import { useRouter } from "next/navigation";
import React from "react";

const RedirectWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  React.useEffect(() => {
    let id = undefined;

    id = setTimeout(() => {
      router.push("/snippets");
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [router]);

  return children;
};

export default RedirectWrapper;
