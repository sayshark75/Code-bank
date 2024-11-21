import RedirectWrapper from "@/components/RedirectWrapper";
import { Flex, Text } from "@chakra-ui/react";

export default async function Page() {
  return (
    <RedirectWrapper>
      <Flex
        w="100%"
        minH={"100vh"}
        bgColor={"light.100"}
        color={"dark.100"}
        direction="column"
        pt={["56px", "64px"]}
        justify={"center"}
        align={"center"}
      >
        <Text fontSize={["24px", "64px"]} fontWeight={600} fontFamily={"mont"}>
          CodeBank
        </Text>
        <Text mt={8} fontFamily={"mont"}>
          Redirecting...
        </Text>
      </Flex>
    </RedirectWrapper>
  );
}
