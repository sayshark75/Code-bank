import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { MdArrowForward } from "react-icons/md";

const CustomEmpty = () => {
  return (
    <Flex w={"100%"} bgColor={"light.200"} minH={"100vh"} direction={"column"} gap={3} justifyContent={"center"} alignItems={"center"}>
      <Text as={"h1"} color={"primary.200"} textStyle={"heading-h1-lg"}>
        Empty!
      </Text>
      <Text as={"p"} color={"dark.200"} textStyle={"p-lg"}>
        There are no favorite snippets found...
      </Text>
      <Text as={"p"} color={"dark.200"} textStyle={"p-lg"}>
        You can add new from Snippets page
      </Text>
      <CustomButton title="Go To Snippets" variant="grey-solid" link="/snippets-page">
        <MdArrowForward />
      </CustomButton>
    </Flex>
  );
};

export default CustomEmpty;
