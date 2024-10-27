import { Flex } from "@chakra-ui/react";
import { SnippetAPIDataType } from "@/TYPES";
import SearchSnippet from "@/components/SearchBar/SearchSnippet";

async function fetchSnippetData(query: string = ""): Promise<SnippetAPIDataType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/snippets?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch snippet data");
  const data = await res.json();
  return data.data;
}

export default async function Page() {
  const initialData = await fetchSnippetData();

  return (
    <Flex w="100%" direction="column" pt={["56px", "64px"]}>
      <SearchSnippet initialData={initialData} />
    </Flex>
  );
}
