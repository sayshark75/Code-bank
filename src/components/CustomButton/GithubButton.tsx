import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { SiGithub } from "react-icons/si";

const GithubButton = () => {
  return (
    <IconButton
      as={Link}
      target="_blank"
      href="https://github.com/sayshark75/Code-bank"
      rounded={"full"}
      ml={5}
      overflow={"hidden"}
      bgColor={"light.200"}
      icon={<SiGithub />}
      aria-label="Visit Github page"
    />
  );
};

export default GithubButton;
