import { Flex, Spinner } from "@chakra-ui/react";

const CustomLoader = () => {
  return (
    <Flex w={"100%"} bgColor={"light.100"} pos={"relative"} zIndex={20} minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Spinner />
    </Flex>
  );
};

export default CustomLoader;
