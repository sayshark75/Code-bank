import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdInfoOutline } from "react-icons/md";
import AlertBox from "./AlertBox";

const UsagePopup = ({ content = "" }: { content?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex fontSize={"24px"} gap={2} justifyContent={"center"} alignItems={"center"}>
      <IconButton
        fontSize={"16px"}
        bgColor={"transparent"}
        border={"1px solid"}
        borderColor={"light.300"}
        rounded={"md"}
        icon={<MdInfoOutline />}
        aria-label="Document Popup Button"
        onClick={onOpen}
        title="Usage Info"
      />
      <AlertBox isOpen={isOpen} onClose={onClose} content={content} />
    </Flex>
  );
};

export default UsagePopup;
