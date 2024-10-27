import { Flex } from "@chakra-ui/react";
import SearchSnippet from "@/components/SearchBar/SearchSnippet";

export default async function Page() {
  return (
    <Flex w="100%" direction="column" pt={["56px", "64px"]}>
      <SearchSnippet />
    </Flex>
  );
}
