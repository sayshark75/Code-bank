"use client";
import { sidebarTabs } from "@/CONSTANTS";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import TabLink from "./TabLink";
import { Link } from "@chakra-ui/next-js";
import GithubButton from "../CustomButton/GithubButton";
import UserMenuButton from "../UserMenu/UserMenuButton";

const DrawerComponent = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor={"light.100"}>
        <DrawerHeader py={"8px"} px={4} borderBottom={"1px solid"} borderBottomColor={"light.300"}>
          <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Link href={"/"} _hover={{}}>
              <Text textStyle={"p-lg"} textAlign={"left"} color={"dark.200"}>
                Code Bank
              </Text>
            </Link>
            {isMobile && (
              <Flex>
                <GithubButton />
                <UserMenuButton />
              </Flex>
            )}
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          {/* Tabs list */}

          <Flex w={"100%"} px={"8px"} direction={"column"}>
            {sidebarTabs.map(({ title, link, IconName }, index) => {
              return (
                <TabLink key={`tab-link-key-${index}`} link={link}>
                  <IconName fontSize={"24px"} style={{ position: "relative", zIndex: 1 }} />{" "}
                  <Text pos={"relative"} zIndex={1}>
                    {title}
                  </Text>
                </TabLink>
              );
            })}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
