import React from "react";
import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import ThemeChanger from "@/components/ThemeChanger/ThemeChanger";

export const metadata: Metadata = {
  title: "Codebank | Authentication",
  description: "A Library to easily use pre-configured code snippets tailored to your project needs.",
};

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex minH={"100vh"} color={"dark.100"} bgColor={"light.250"} w={"100%"}>
      <Flex w={"100%"} bgColor={"light.200"} pos={"absolute"} top={0} left={"0"} p={2} justify={"flex-end"} align={"center"}>
        <ThemeChanger />
      </Flex>
      {children}
    </Flex>
  );
}

export default layout;
