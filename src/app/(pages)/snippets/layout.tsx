import Navigation from "@/components/Navigation/Navigation";
import PrivateRoute from "@/components/PrivateRoute";
import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <PrivateRoute>
      <Flex
        w={"100%"}
        pos={"relative"}
        minH={"100vh"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        bgColor={"light.250"}
        direction={["column", "column", "column", "column", "row"]}
      >
        <Navigation />
        {children}
      </Flex>
    </PrivateRoute>
  );
};

export default layout;
