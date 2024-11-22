"use client";
import loading from "@/app/loading";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { favoriteSnippet } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const FavoriteCodeButton = ({ favorites, snippetId }: { snippetId: string; favorites: favoriteSnippet[] }) => {
  const { data } = useSession();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleToggleFavorite = async () => {
    setLoading(true);

    if (!data?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to favorite a snippet.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/snippets/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favoriteId: favorites?.[0]?.id || null, // Pass the favorite ID if it exists
        creatorId: data.user.id, // Current user ID
        snippetId, // Snippet ID
      }),
    });

    const resData = await res.json();

    if (resData.status) {
      // Optimistically update the state
      setIsFavorite((prev) => !prev);
    }

    toast({
      title: resData.status ? "Success" : "Error",
      description: resData.message,
      status: resData.status ? "success" : "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  };

  useEffect(() => {
    const findIsFav = favorites.some((fav) => fav.creatorId === data?.user?.id);
    setIsFavorite(findIsFav || false);
  }, [favorites, data?.user?.id]);
  return (
    <IconButton
      fontSize={"16px"}
      bgColor={"transparent"}
      border={"1px solid"}
      borderColor={"light.300"}
      rounded={"md"}
      icon={isFavorite ? loading ? <Spinner size={"sm"} /> : <FaHeart color="#1B8DFF" /> : loading ? <Spinner size={"sm"} /> : <FaRegHeart />}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={handleToggleFavorite}
    />
  );
};

export default FavoriteCodeButton;
