import { Box, Flex, Text } from "@chakra-ui/react";
import { like } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

const LikeButton = ({ snippetId, snippetLikes }: { snippetLikes: like[]; snippetId: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { data } = useSession();

  // Fetch the initial like status and count
  useEffect(() => {
    const initialLikeStatus = snippetLikes.some((like) => like.creatorId === data?.user.id && like.snippetId === snippetId);
    setIsLiked(initialLikeStatus);
    setLikeCount(snippetLikes.length);
  }, [snippetId, snippetLikes, data?.user.id]);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    try {
      const response = await fetch(`/api/like/snippet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId, creatorId: data?.user.id, isLiked }),
      });

      if (!response.ok) {
        setIsLiked(!isLiked);
        console.error("Failed to update like status");
      } else {
        console.log("Like status updated successfully");
      }
    } catch (error) {
      console.error("Error in handleLikeClick:", error);
    }
  };

  useEffect(() => {
    if (isLiked) {
      setLikeCount((prevCount) => prevCount + 1);
    } else {
      setLikeCount((prevCount) => prevCount - 1);
    }
  }, [isLiked]);

  return (
    <Flex align={"center"} bgColor={"light.200"} rounded={"md"}>
      <Box px={3} onClick={handleLikeClick} py={1} cursor={"pointer"} bgColor={"light.200"} _hover={{ color: "primary.300" }}>
        {isLiked ? <MdThumbUp /> : <MdOutlineThumbUp />}
      </Box>
      <Text fontSize={"14px"} px={3} py={1}>
        {likeCount}
      </Text>
    </Flex>
  );
};

export default LikeButton;
