import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { materialDark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const AlertBox = ({ isOpen, onClose, content = "" }: { content: string; isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      {/* alert */}
      <ModalContent color={"dark.300"} bgColor={"light.200"}>
        <ModalHeader>Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={4} textAlign={"left"}>
            <Markdown
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter PreTag="div" language={match[1]} style={materialDark}>
                      {content}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {content}
                    </code>
                  );
                },
              }}
            >
              {content}
            </Markdown>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlertBox;
