import { Flex, IconButton, Input, ResponsiveValue } from "@chakra-ui/react";
import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const CustomPasswordInput = ({
  value,
  onChange,
  name,
  form,
  id,
  placeholder,
  required,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  form?: string;
  required?: boolean;
}) => {
  const [show, setShow] = useState(false);
  return (
    <Flex maxW={"400px"} w={["min-content", "100%"]} minW={"240px"} borderBottom={"1px solid"} borderBottomColor={"primary.200"}>
      <Input
        minH={"40px"}
        type={show ? "text" : "password"}
        name={name}
        rounded={"none"}
        id={id}
        variant={"unstyled"}
        placeholder={placeholder}
        form={form}
        required={required}
        value={value}
        onChange={onChange}
        _placeholder={{ color: "dark.100" }}
      />
      <IconButton
        bgColor={"transparent"}
        _hover={{}}
        _active={{}}
        aria-label="Password show/hide button"
        icon={show ? <BsEyeFill /> : <BsEyeSlashFill />}
        onClick={() => setShow((prev) => !prev)}
      />
    </Flex>
  );
};

export default CustomPasswordInput;
