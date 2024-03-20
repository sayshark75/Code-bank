import { Flex, Input, ResponsiveValue } from "@chakra-ui/react";
import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

const CustomInput = ({
  value,
  onChange,
  type,
  name,
  autoComplete,
  form,
  id,
  placeholder,
  required,
  variant,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  variant?: ResponsiveValue<string>;
  placeholder?: string;
  form?: string;
  required?: boolean;
}) => {
  return (
    <Flex maxW={"400px"} w={["min-content", "100%"]} minW={"240px"} borderBottom={"1px solid"} borderBottomColor={"primary.200"}>
      <Input
        minH={"40px"}
        rounded={"none"}
        type={type}
        autoComplete={autoComplete}
        name={name}
        id={id}
        variant={"unstyled"}
        placeholder={placeholder}
        form={form}
        required={required}
        value={value}
        onChange={onChange}
        _placeholder={{ color: "dark.100" }}
      />
    </Flex>
  );
};

export default CustomInput;
