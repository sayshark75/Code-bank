"use client";
import GithubButton from "@/components/CustomButton/GithubButton";
import { Badge, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <Flex
      bgColor={"light.200"}
      color={"dark.100"}
      w={"100%"}
      pos={"absolute"}
      top={"0px"}
      left={"0px"}
      direction={"column"}
      gap={4}
      zIndex={10}
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text as={"h1"} color={"primary.200"} textStyle={"heading-h1-lg"}>
        Oops!
      </Text>
      <Text as={"p"} color={"dark.200"} textStyle={"p-md"}>
        Something went wrong...
      </Text>
      <Tabs w={["100%", "50%"]} border={"1px solid"} borderColor={"light.100"} rounded={"lg"}>
        <TabList bgColor={"light.100"}>
          <Tab>Developer Info</Tab>
          <Tab>Error Stack</Tab>
        </TabList>

        <TabPanels bgColor={"light.300"}>
          <TabPanel h={"300px"} overflow={"auto"}>
            {error.message}
          </TabPanel>
          <TabPanel h={"300px"} overflow={"auto"}>
            {error.stack}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex justify={"center"} align={"center"}>
        <Text>Visit GitHub to raise/resolve this issues:</Text>
        <GithubButton />
      </Flex>{" "}
    </Flex>
  );
};

export default ErrorPage;
