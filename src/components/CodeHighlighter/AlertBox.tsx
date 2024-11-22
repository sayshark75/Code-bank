import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AlertBox = ({ isOpen, onClose, content = "" }: { content: string; isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal size={{ base: "6xl", md: "3xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }} isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      {/* alert */}
      <ModalContent color={"dark.300"} bgColor={"light.200"}>
        <ModalHeader>Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={4} textAlign={"left"}>
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlertBox;
