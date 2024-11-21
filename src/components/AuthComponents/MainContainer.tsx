"use client";
import { Box, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import LoginForm from "./LoginForm";
import logo from "@/assets/icons/icon.svg";
import SignUpForm from "./SignUpForm";

const MainContainer = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabChange = (index: number) => setTabIndex(index);
  return (
    <Box w={"100%"} maxW={"350px"} p={2} rounded={"lg"} shadow={"lg"} bgColor={"light.100"}>
      <Tabs isFitted variant="enclosed" bgColor={"light.100"} index={tabIndex} onChange={handleTabChange}>
        <TabList>
          <Tab fontSize={"xs"} color={"dark.100"}>
            Login
          </Tab>
          <Tab fontSize={"xs"} color={"dark.100"}>
            Sign Up
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Image mx={"auto"} w={"50px"} src={logo.src} alt="logo" />
            <LoginForm />
            <Text fontSize={"12px"}>
              Don&apos;t have an account?{" "}
              <Text as={"span"} color={"primary.200"} onClick={() => setTabIndex(1)} cursor={"pointer"}>
                Sign up!
              </Text>
            </Text>
          </TabPanel>
          <TabPanel>
            <Image mx={"auto"} w={"50px"} src={logo.src} alt="logo" />
            <SignUpForm />
            <Text fontSize={"12px"}>
              Already have an account?{" "}
              <Text as={"span"} color={"primary.200"} onClick={() => setTabIndex(0)} cursor={"pointer"}>
                Login!
              </Text>
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MainContainer;
