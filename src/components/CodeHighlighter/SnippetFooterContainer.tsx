import { Flex } from "@chakra-ui/react";
import React from "react";
import LikeButton from "./LikeButton";
import { like } from "@prisma/client";

const SnippetFooterContainer = ({ id = "", snippetLikes }: { id: string; snippetLikes: like[] }) => {
  return (
    <Flex w={"100%"} mt={1} justify={"space-between"} align={"center"}>
      <LikeButton snippetId={id} snippetLikes={snippetLikes} />
      {/* <Flex>
        <FaRegMessage />
      </Flex> */}
    </Flex>
  );
};

export default SnippetFooterContainer;
