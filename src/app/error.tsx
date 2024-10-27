"use client";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <Flex
      bgColor={"light.200"}
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
      <Box w={"30%"} pos={"relative"} border={"1px solid #aaa"} textStyle={"p-sm"} rounded={"lg"} p={2} pt={5}>
        <Badge variant={"solid"} colorScheme={"green"} pos={"absolute"} top={"-10px"} left={"10px"}>
          Dev info:
        </Badge>
        {error.message}
      </Box>
    </Flex>
  );
};

export default ErrorPage;
