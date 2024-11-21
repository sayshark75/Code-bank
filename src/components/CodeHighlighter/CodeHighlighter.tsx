"use client";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdKeyboard, MdOutlineHotelClass, MdOutlineThumbDown, MdOutlineThumbUp, MdPerson } from "react-icons/md";
import UsagePopup from "./UsagePopup";
import { decodeString } from "@/helpers/formatString";
import CopyCodeButton from "./CopyButton";
import FavoriteCodeButton from "./FavoriteCodeButton";
import { favoriteSnippet } from "@prisma/client";
import { FaRegMessage } from "react-icons/fa6";

const CodeHighlighter: React.FC<{
  id: string;
  language: string;
  author: string;
  description: string;
  version: string;
  code: string;
  title: string;
  favorites: favoriteSnippet[];
}> = ({ version = "1.0.0", id = "", favorites, title = "", author = "SayShark", code = "", language = "jsx", description = "" }) => {
  const { colorMode } = useColorMode();

  return (
    <Box w={"100%"} mt={1} p={[2, 8]} bgColor={"light.100"} border={"1px solid"} borderColor={"light.300"} rounded={"lg"} px={3}>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"1px solid"}
        borderBottomColor={"light.300"}
        p={{ base: 0, md: 2 }}
        gap={{ base: 0, md: 2 }}
      >
        <Flex
          ml={4}
          w={"100%"}
          flex={2}
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={["flex-start", "flex-start", "flex-end"]}
          gap={[1, 2]}
          wrap={"wrap"}
          fontSize={["12px", "12px", "16px"]}
          textTransform={"capitalize"}
        >
          <Flex
            title="Snippet title"
            fontSize={"12px"}
            bgColor={"light.200"}
            lineHeight={"100%"}
            border={"1px solid"}
            borderColor={"light.300"}
            p={1}
            px={2}
            rounded={"md"}
            alignItems={"center"}
            gap={2}
          >
            <MdOutlineHotelClass />
            {title}
          </Flex>
          <Flex
            title="Creator's name"
            fontSize={"12px"}
            bgColor={"light.200"}
            lineHeight={"100%"}
            border={"1px solid"}
            borderColor={"light.300"}
            p={1}
            px={2}
            rounded={"md"}
            alignItems={"center"}
            gap={2}
          >
            <MdPerson />
            {author}
          </Flex>{" "}
          <Flex
            title="Language used"
            fontSize={"12px"}
            bgColor={"light.200"}
            lineHeight={"100%"}
            border={"1px solid"}
            borderColor={"light.300"}
            p={1}
            px={2}
            rounded={"md"}
            alignItems={"center"}
            gap={2}
          >
            <MdKeyboard /> {language}
          </Flex>
          <Flex
            title="Snippet Version"
            fontSize={"12px"}
            bgColor={"light.200"}
            lineHeight={"100%"}
            border={"1px solid"}
            borderColor={"light.300"}
            p={1}
            px={2}
            rounded={"md"}
          >
            V{version}
          </Flex>
        </Flex>

        <Flex flex={1} flexWrap={"wrap"} w={"100%"} justifyContent={"flex-end"} gap={[1, 4]} alignItems={"center"}>
          {description && <UsagePopup content={description} />}
          <CopyCodeButton code={code} />
          <FavoriteCodeButton favorites={favorites} snippetId={id} />
        </Flex>
      </Flex>
      <Box w={"100%"} overflow={"hidden"} fontSize={["12px", "12px", "14px", "16px"]}>
        <Box w={"100%"} minW={"280px"} overflow={"auto"} maxH={"400px"}>
          <Box w={"100%"} minH={"100%"} bgColor={"violet"}>
            <SyntaxHighlighter showLineNumbers language={language} style={colorMode === "light" ? prism : materialDark}>
              {decodeString(code)}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Box>
      {/* <Flex w={"100%"} justify={"space-between"} align={"center"}>
        <Flex align={"center"} gap={2}>
          <MdOutlineThumbUp />
          <Text>0</Text>
          <MdOutlineThumbDown /> <Text>0</Text>
        </Flex>
        <Flex>
          <FaRegMessage />
        </Flex>
      </Flex> */}
    </Box>
  );
};

export default CodeHighlighter;
