import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const loading = () => {
  return (
    <Flex w={"100%"} bgColor={"dark.100"} pos={"relative"} zIndex={20} minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Spinner />
    </Flex>
  );
};

export default loading;
