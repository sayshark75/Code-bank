"use client";
import { Box, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import logo from "@/assets/icons/icon.svg";
import DrawerComponent from "./DrawerComponent";
import { Link } from "@chakra-ui/next-js";
import { MotionFlex } from "@/libs/motionComponents";

const MobileNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <MotionFlex
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      w={"100%"}
      pos={"fixed"}
      top={"0px"}
      left={"0px"}
      zIndex={4}
      h={"max-content"}
      px={"16px"}
      py={"10px"}
      gap={"18px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgColor={"light.100"}
      shadow={"base"}
    >
      <IconButton
        w={"30px"}
        h={"30px"}
        bgColor={"transparent"}
        border={"1px solid"}
        borderColor={"light.300"}
        fontSize={"20px"}
        justifySelf={"flex-end"}
        icon={<MdMenu />}
        aria-label="Menu Button"
        onClick={onOpen}
      />
      <Link href={"/"} opacity={0}>
        <Box>
          <Image w={"30px"} h={"30px"} src={logo.src} alt={"A Library Based on Chakra UI, Provides UI Interfaces for React projects."} />
        </Box>
      </Link>
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
    </MotionFlex>
  );
};

export default MobileNavbar;
