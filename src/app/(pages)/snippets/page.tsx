import SnippetContainer from "@/components/SnippetContainer";
import { Flex } from "@chakra-ui/react";
import React from "react";

const SnippetsPage = () => {
  return (
    <Flex w="100%" direction="column" pt={["56px", "64px"]}>
      <SnippetContainer />
    </Flex>
  );
};

export default SnippetsPage;
