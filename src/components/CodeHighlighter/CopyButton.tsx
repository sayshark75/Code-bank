"use client";
import { decodeString } from "@/helpers/formatString";
import { IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdContentCopy, MdOutlineCheckCircle } from "react-icons/md";

const CopyCodeButton = ({ code }: { code: string }) => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      window.navigator.clipboard.writeText(decodeString(code));
      setTimeout(() => {
        setIsCopy(false);
      }, 2000);
    }
  }, [code, isCopy]);

  return (
    <IconButton
      fontSize={"16px"}
      bgColor={"transparent"}
      border={"1px solid"}
      borderColor={"light.300"}
      rounded={"md"}
      icon={isCopy ? <MdOutlineCheckCircle /> : <MdContentCopy />}
      aria-label="Copy The Code"
      onClick={isCopy ? () => {} : () => setIsCopy(true)}
      title={isCopy ? "Code Copied" : "Copy Code"}
    />
  );
};

export default CopyCodeButton;
