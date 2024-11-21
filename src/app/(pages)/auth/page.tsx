// components/LoginForm.js

import MainContainer from "@/components/AuthComponents/MainContainer";
import { Flex } from "@chakra-ui/react";

export default function AuthPage() {
  return (
    <Flex color={"dark.100"} bgColor={"light.250"} w={"100%"} justify={"center"} align={"center"}>
      <MainContainer />
    </Flex>
  );
}
