import { Flex } from "@chakra-ui/react";
import React from "react";
import { MdKeyboard, MdOutlineHotelClass, MdPerson } from "react-icons/md";
import UsagePopup from "./UsagePopup";
import CopyCodeButton from "./CopyButton";
import FavoriteCodeButton from "./FavoriteCodeButton";
import { favoriteSnippet } from "@prisma/client";

const SnippetHeaderContainer = ({
  id = "",
  favorites = [],
  title = "",
  author = "SayShark",
  code = "",
  language = "jsx",
  version = "1.0.0",
  description = "",
}: {
  title: string;
  author: string;
  code: string;
  language: string;
  description: string;
  version: string;
  id: string;
  favorites: favoriteSnippet[];
}) => {
  return (
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
  );
};

export default SnippetHeaderContainer;
