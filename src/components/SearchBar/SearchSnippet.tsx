"use client";
import { useState } from "react";
import CodeHighlighter from "@/components/CodeHighlighter/CodeHighlighter";
import CustomNotFound from "@/components/CustomePrompts/CustomNotFound";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { SnippetAPIDataType } from "@/TYPES";
import useDebouncer from "@/hooks/useDebounce";

interface SearchSnippetProps {
  initialData: SnippetAPIDataType[];
}

export default function SearchSnippet({ initialData }: SearchSnippetProps) {
  const [data, setData] = useState<SnippetAPIDataType[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();

  const handleSearchChange = useDebouncer(async (query: string) => {
    await getSnippetData(query);
  }, 500);

  const getSnippetData = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/snippets?q=${query}`);
      const responseData = await res.json();
      setData(responseData.data);
    } catch (error: any) {
      if (!toast.isActive("errorToast")) {
        toast({
          title: "Error fetching snippets",
          description: "Please check your connection or API status.",
          status: "error",
          duration: 3000,
          isClosable: true,
          id: "errorToast",
        });
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box w={"100%"}>
      <SearchBar
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
          handleSearchChange(event.target.value);
        }}
      />
      {loading ? (
        <Flex justify="center" align="center" w="100%" minH="100vh">
          <Spinner />
        </Flex>
      ) : error ? (
        <CustomNotFound />
      ) : data.length === 0 && searchQuery !== "" ? (
        <CustomNotFound />
      ) : (
        data.map((snippet, index) => <CodeHighlighter key={`snippet-key-${index}`} {...snippet} />)
      )}
    </Box>
  );
}
