"use client";
import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { decodeString } from "@/helpers/formatString";
import { favoriteSnippet, like } from "@prisma/client";
import SnippetHeaderContainer from "./SnippetHeaderContainer";
import SnippetFooterContainer from "./SnippetFooterContainer";

const CodeHighlighter: React.FC<{
  id: string;
  language: string;
  author: string;
  description: string;
  version: string;
  code: string;
  title: string;
  favorites: favoriteSnippet[];
  snippetLikes: like[];
}> = ({ version = "1.0.0", id = "", favorites, snippetLikes, title = "", author = "SayShark", code = "", language = "jsx", description = "" }) => {
  const { colorMode } = useColorMode();

  return (
    <Box w={"100%"} mt={1} px={[3, 8]} py={[2, 3]} bgColor={"light.100"} border={"1px solid"} borderColor={"light.300"} rounded={"lg"}>
      <SnippetHeaderContainer
        id={id}
        favorites={favorites}
        title={title}
        author={author}
        code={code}
        language={language}
        version={version}
        description={description}
      />
      <Box w={"100%"} overflow={"hidden"} fontSize={["12px", "12px", "14px", "16px"]}>
        <Box w={"100%"} minW={"280px"} overflow={"auto"} maxH={"400px"}>
          <Box w={"100%"} minH={"100%"}>
            <SyntaxHighlighter showLineNumbers language={language} style={colorMode === "light" ? prism : materialDark}>
              {decodeString(code)}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Box>
      <SnippetFooterContainer id={id} snippetLikes={snippetLikes} />
    </Box>
  );
};

export default CodeHighlighter;
