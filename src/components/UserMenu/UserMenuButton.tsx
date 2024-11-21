"use client";
import { Box, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegUserCircle, FaUserEdit } from "react-icons/fa";
import { FaHeart, FaPlus } from "react-icons/fa6";
import { MdAutoFixHigh, MdLogout } from "react-icons/md";

const UserMenuButton = () => {
  const { data } = useSession();
  const router = useRouter();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        rounded={"full"}
        ml={5}
        overflow={"hidden"}
        bgColor={"light.200"}
        icon={<FaRegUserCircle />}
        aria-label="Open user menu"
      />
      <MenuList zIndex={999} bgColor={"light.100"} color={"dark.100"}>
        <MenuItem bgColor={"light.100"} color={"dark.100"}>
          <Flex gap={2} direction={"column"}>
            <Flex gap={2} align={"center"} justify={"flex-start"}>
              <Flex justify={"center"} align={"center"} w={"40px"} h={"40px"} rounded={"full"} bgColor={"light.200"}>
                <FaUserEdit fontSize={"20px"} />
              </Flex>
              <Flex direction={"column"}>
                <Text fontSize={"xs"} lineHeight={"130%"}>
                  {data?.user?.name}
                </Text>
                <Text fontSize={"xs"} lineHeight={"130%"}>
                  {data?.user?.email}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          bgColor={"light.100"}
          _hover={{ bgColor: "light.200" }}
          color={"dark.100"}
          icon={<FaPlus fontSize={"16px"} />}
          fontSize={"12px"}
          onClick={() => router.push("./create-snippet")}
        >
          Create new snippet
        </MenuItem>
        <MenuItem
          bgColor={"light.100"}
          _hover={{ bgColor: "light.200" }}
          color={"dark.100"}
          icon={<FaHeart fontSize={"16px"} />}
          fontSize={"12px"}
          onClick={() => router.push("./snippets?favorite=true")}
        >
          Favorite Snippets
        </MenuItem>
        {/* <MenuItem
          bgColor={"light.100"}
          _hover={{ bgColor: "light.200" }}
          color={"dark.100"}
          icon={<MdAutoFixHigh fontSize={"16px"} />}
          fontSize={"12px"}
        >
          Stale Snippets
        </MenuItem> */}
        <MenuItem
          _hover={{ bgColor: "light.200" }}
          bgColor={"light.100"}
          color={"dark.100"}
          icon={<MdLogout fontSize={"16px"} />}
          fontSize={"12px"}
          onClick={() => signOut({ callbackUrl: "/auth" })}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenuButton;
