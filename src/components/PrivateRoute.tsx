"use client";

import { MotionText } from "@/libs/motionComponents";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const PrivateRoute = ({ routePath = "/snippets", children }: { routePath?: string; children: ReactNode }) => {
  // *********************************************************************************************
  // this HOF Wrapper component is used to handle Private Routing, which will keep some routes
  // hidden or locked until authorized or authenticated.
  // *********************************************************************************************

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (status === "authenticated") {
      // Allow access to the dashboard
      router.push(routePath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return (
      <Flex w={"100%"} color={"dark.100"} bgColor={"light.250"} justify={"center"} h={"100vh"} align={"center"}>
        Please wait...
      </Flex>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Flex justify={"center"} align={"center"} w={"100%"} minH={"100vh"} color={"dark.100"} bgColor={"light.250"} direction={"column"} gap={3}>
        <MotionText initial={{ y: "-10%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} transition={{ duration: 1.5 }} fontSize={"3xl"}>
          Logged Out
        </MotionText>
        <MotionText initial={{ x: "10%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} transition={{ duration: 1 }}>
          Redirecting...
        </MotionText>
      </Flex>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
