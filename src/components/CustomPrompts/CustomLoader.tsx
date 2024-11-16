import { Flex } from "@chakra-ui/react";

const CustomLoader = ({ title = "Loading..." }: { title?: string }) => {
  return (
    <Flex w={"100%"} bgColor={"light.100"} pos={"relative"} zIndex={20} minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      {title}
    </Flex>
  );
};

export default CustomLoader;
