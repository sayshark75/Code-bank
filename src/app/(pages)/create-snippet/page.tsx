import CreationForm from "@/components/CreateNewSnippetComps/CreationForm";
import { Flex } from "@chakra-ui/react";
import React from "react";

const CreateSnippetPage = () => {
  return (
    <Flex w={"100%"} minH={"100vh"} bgColor={"light.100"} color={"dark.100"} justify={"center"} align={"center"}>
      <CreationForm />
    </Flex>
  );
};

export default CreateSnippetPage;
