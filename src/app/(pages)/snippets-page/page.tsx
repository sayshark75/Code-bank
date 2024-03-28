"use client";
import { RequestSnippetType, SnippetDataType } from "@/TYPES";
import { getData } from "@/api/api";
import CodeHighlighter from "@/components/CodeHighlighter/CodeHighlighter";
import CustomError from "@/components/CustomePrompts/CustomError";
import CustomLoader from "@/components/CustomePrompts/CustomLoader";
import CustomNotFound from "@/components/CustomePrompts/CustomNotFound";
import Navigation from "@/components/Navigation/Navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import useDebouncer from "@/hooks/useDebounce";
import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SnippetsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [data, setData] = useState<SnippetDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toast = useToast();

  const handleSearchChange = useDebouncer(async (query: string) => {
    getSnippetData(query);
  }, 500);

  const getSnippetData = async (query: string) => {
    try {
      setLoading(true);
      const resData: RequestSnippetType = await getData(query);
      if (!resData.status) {
        setError(true);
      } else {
        setData(resData.snippets);
      }
    } catch (error: any) {
      console.log("error: ", error);
      toast({
        title: error.response.data?.error?.message || "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSnippetData(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <SearchBar
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            handleSearchChange(event.target.value);
          }}
        />
        {data.length === 0 && searchQuery !== "" ? (
          <CustomNotFound />
        ) : (
          data?.map((snippet, index) => {
            return <CodeHighlighter key={`snippet-key-${index}`} {...snippet} />;
          })
        )}
      </Flex>
    </Flex>
  );
};

export default SnippetsPage;
