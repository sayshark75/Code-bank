import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { SiGithub } from "react-icons/si";

const CustomNotFound = ({ title = "The Snippet you are looking for, is not found..." }: { title?: string }) => {
  return (
    <Flex w={"100%"} bgColor={"light.100"} minH={"100vh"} direction={"column"} gap={3} justifyContent={"center"} alignItems={"center"}>
      <Text as={"h1"} color={"primary.200"} textStyle={"heading-h1-lg"}>
        Not{" "}
        <Text as={"span"} color={"dark.100"}>
          Found!
        </Text>
      </Text>
      <Text as={"p"} mb={5} color={"dark.100"} whiteSpace={"pre-wrap"} textStyle={"p-lg"}>
        {title}
      </Text>

      <CustomButton title="GitHub" variant="grey-solid" link="https://github.com/sayshark75/code-bank" target="_blank">
        <SiGithub />
      </CustomButton>
    </Flex>
  );
};

export default CustomNotFound;
