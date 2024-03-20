import React from "react";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import { Flex } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <Flex
      pos={"fixed"}
      top={"0px"}
      right={"0px"}
      zIndex={5}
      justifyContent={"center"}
      alignItems={"center"}
      mt={[2, 2, 2, 2, 4]}
      mr={[2, 2, 2, 2, 4]}
    >
      <ThemeChanger />
    </Flex>
  );
};

export default TopBar;
