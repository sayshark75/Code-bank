"use client";
import { useCallback, useEffect, useState } from "react";
import CodeHighlighter from "@/components/CodeHighlighter/CodeHighlighter";
import CustomNotFound from "@/components/CustomPrompts/CustomNotFound";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Box, useBreakpointValue, useToast } from "@chakra-ui/react";
import { CodeSnippetType } from "@/TYPES";
import useDebouncer from "@/hooks/useDebounce";
import CustomLoader from "./CustomPrompts/CustomLoader";
import { MotionFlex } from "@/libs/motionComponents";
import ThemeChanger from "./ThemeChanger/ThemeChanger";
import GithubButton from "./CustomButton/GithubButton";
import UserMenuButton from "./UserMenu/UserMenuButton";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SnippetContainer() {
  const [snippetData, setSnippetData] = useState<CodeSnippetType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useSession();
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSearchChange = useDebouncer(async (query: string) => {
    await getSnippetData(query, params.get("favorite") || "false");
  }, 500);

  const getSnippetData = useCallback(
    async (query: string, isFavorite: string) => {
      setLoading(true);
      const res = await fetch(`/api/snippets`, {
        method: "POST",
        body: JSON.stringify({ query, isFavorite, creatorId: data?.user.id }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const responseData = await res.json();
      setSnippetData(responseData.data);

      setLoading(false);
    },
    [data?.user.id]
  );

  useEffect(() => {
    const getInitialData = async () => {
      await getSnippetData("", params.get("favorite") || "false");
    };
    getInitialData();
  }, [getSnippetData, params]);

  return (
    <Box w={"100%"} color={"dark.100"} bgColor={"light.250"}>
      <MotionFlex
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        pos={"fixed"}
        top={"0px"}
        right={"0px"}
        zIndex={5}
        justifyContent={"center"}
        alignItems={"center"}
        mt={[2, 2, 2, 2, 4]}
        mr={[2, 2, 2, 2, 4]}
      >
        <SearchBar
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            handleSearchChange(event.target.value);
          }}
        />
        <ThemeChanger />
        {!isMobile && <GithubButton />}
        {!isMobile && <UserMenuButton />}
      </MotionFlex>
      {loading ? (
        <CustomLoader title="Please wait..." />
      ) : snippetData.length === 0 ? (
        <CustomNotFound title={`Currently there are no snippets at this moment! \n — or — \n Contribute on our GitHub page`} />
      ) : snippetData.length === 0 && searchQuery.length > 0 ? (
        <CustomNotFound title={`No snippets found for '${searchQuery}'`} />
      ) : (
        snippetData.map((snippet, index) => (
          <CodeHighlighter
            key={`snippet-key-${index}`}
            author={snippet.creator.username}
            favorites={snippet.favorites}
            title={snippet.title}
            description={snippet.description}
            code={snippet.code}
            language={snippet.language}
            id={snippet.id}
            version={snippet.version}
            snippetLikes={snippet.likes}
          />
        ))
      )}
    </Box>
  );
}
