"use client";
import { Box, Flex, Input } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ value = "", onChange = () => {} }: { value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      rounded={"full"}
      border={"1px solid"}
      bgColor={"light.200"}
      borderColor={"light.300"}
      overflow={"hidden"}
    >
      <Input
        type="search"
        w={["140px", "200px"]}
        placeholder="Search..."
        name="search"
        autoComplete="search"
        variant={"unstyled"}
        pl={5}
        value={value}
        onChange={onChange}
      />
      <Box p={3}>
        <MdSearch />
      </Box>
    </Flex>
  );
};

export default SearchBar;
