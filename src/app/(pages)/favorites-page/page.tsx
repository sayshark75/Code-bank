"use client";
import { RequestSnippetType, SnippetDataType } from "@/TYPES";
import { getFavoritesData } from "@/api/api";
import CodeHighlighter from "@/components/CodeHighlighter/CodeHighlighter";
import CustomEmpty from "@/components/CustomePrompts/CustomEmpty";
import CustomError from "@/components/CustomePrompts/CustomError";
import CustomLoader from "@/components/CustomePrompts/CustomLoader";
import TopBar from "@/components/FavoritesComponents/TopBar";
import Navigation from "@/components/Navigation/Navigation";
import { Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";

const FavoritesPage = () => {
  const cookie = useMemo(() => {
    return new Cookies(null, { path: "/" });
  }, []);
  const navigation = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [data, setData] = useState<SnippetDataType[]>([]);
  const toast = useToast();

  const getFavoriteData = async () => {
    try {
      setLoading(true);
      const resData: RequestSnippetType = await getFavoritesData();
      if (resData.status) {
        setData(resData.snippets);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error: any) {
      console.log("error: ", error);
      toast({
        title: error.response.data?.error?.message || "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!cookie.get("refreshToken")) {
      navigation.replace("/login");
      return;
    }
    getFavoriteData();
  }, [cookie, navigation]);

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return <CustomError />;
  }

  return (
    <Flex
      w={"100%"}
      pos={"relative"}
      minH={"100vh"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      bgColor={"light.250"}
      direction={["column", "column", "column", "column", "row"]}
    >
      <Navigation />
      <Flex w={"100%"} direction={"column"} pt={["56px", "64px"]}>
        <TopBar />
        {data.length === 0 ? (
          <CustomEmpty />
        ) : (
          data?.map((snippet, index) => {
            return <CodeHighlighter key={`snippet-key-${index}`} {...snippet} isFavorite={true} getFavoriteData={getFavoriteData} />;
          })
        )}
      </Flex>
    </Flex>
  );
};

export default FavoritesPage;
