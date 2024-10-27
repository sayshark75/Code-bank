"use client";
import { useCallback, useEffect, useState } from "react";
import CodeHighlighter from "@/components/CodeHighlighter/CodeHighlighter";
import CustomNotFound from "@/components/CustomePrompts/CustomNotFound";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { SnippetAPIDataType } from "@/TYPES";
import useDebouncer from "@/hooks/useDebounce";
import CustomLoader from "../CustomePrompts/CustomLoader";

interface SearchSnippetProps {
  initialData: SnippetAPIDataType[];
}

export default function SearchSnippet() {
  const [data, setData] = useState<SnippetAPIDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const toast = useToast();

  const handleSearchChange = useDebouncer(async (query: string) => {
    await getSnippetData(query);
  }, 500);

  const getSnippetData = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/snippets`, {
          method: "POST",
          body: JSON.stringify({ query }),
          headers: {
            "Content-Type": "Application/json",
          },
        });
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
    },
    [toast]
  );

  useEffect(() => {
    const getInitialData = async () => {
      await getSnippetData("");
    };
    getInitialData();
  }, [getSnippetData]);

  return (
    <Box w={"100%"} color={"dark.100"} bgColor={"light.250"}>
      <SearchBar
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
          handleSearchChange(event.target.value);
        }}
      />
      {loading ? (
        <CustomLoader />
      ) : error ? (
        <CustomNotFound />
      ) : data && data.length === 0 && searchQuery !== "" ? (
        <CustomNotFound />
      ) : (
        data.map((snippet, index) => <CodeHighlighter key={`snippet-key-${index}`} {...snippet} />)
      )}
    </Box>
  );
}
