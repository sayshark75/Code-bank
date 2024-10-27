import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const loading = () => {
  return (
    <Flex w={"100%"} bgColor={"light.100"} pos={"relative"} zIndex={10} minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Spinner thickness="4px" speed="0.65s" emptyColor="light.200" color="primary.100" size="xl" />
    </Flex>
  );
};

export default loading;
