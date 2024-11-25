import { Box, Flex, Text } from "@chakra-ui/react";
import { like } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

const LikeButton = ({ snippetId, snippetLikes }: { snippetLikes: like[]; snippetId: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(snippetLikes.length);
  const { data: session } = useSession();

  const handleLikeClick = async () => {
    const currentState = isLiked; // Store current like state
    setIsLiked(!currentState);
    setLikeCount((prev) => prev + (currentState ? -1 : 1)); // Optimistic UI update

    try {
      const response = await fetch(`/api/like/snippet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId, creatorId: session?.user?.id, isLiked: !currentState }),
      });

      if (!response.ok) {
        // Revert state on failure
        setIsLiked(currentState);
        setLikeCount((prev) => prev + (currentState ? 1 : -1));
        throw new Error("Failed to update like status");
      }
    } catch (error) {
      console.error(error);
      // Revert state on failure
      setIsLiked(currentState);
      setLikeCount((prev) => prev + (currentState ? 1 : -1));
      throw error;
    }
  };

  // Determine if the current user has liked the snippet
  useEffect(() => {
    if (session?.user?.id) {
      setIsLiked(snippetLikes.some((like) => like.creatorId === session.user.id));
      setLikeCount(snippetLikes.length);
    }
  }, [snippetLikes, session?.user?.id]);

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
