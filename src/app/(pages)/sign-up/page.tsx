"use client";
import { AuthData } from "@/TYPES";
import { loginUser, signUpUser } from "@/api/api";
import CustomInput from "@/components/CustomInputs/CustomInput";
import CustomPasswordInput from "@/components/CustomInputs/CustomPasswordInput";
import { Box, Button, Flex, IconButton, Link, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdArrowCircleLeft } from "react-icons/md";

const SignUpPage = () => {
  const navigation = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<AuthData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resData = await signUpUser(formData);
      if (resData.status) {
        toast({
          title: "Sign up success, Please login...",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigation.replace("/login");
      }
    } catch (error: any) {
      console.log("error: ", error);
      toast({
        title: error.response.data.error.message || "something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBack = () => {
    navigation.back();
  };

  return (
    <Flex w={"100%"} minH={"100vh"} pos={"relative"} p={8} justifyContent={"center"} alignItems={"center"}>
      <IconButton
        pos={"absolute"}
        top={4}
        left={4}
        fontSize={"22px"}
        bgColor={"light.200"}
        border={"1px solid"}
        borderColor={"light.300"}
        rounded={"full"}
        icon={<MdArrowCircleLeft />}
        onClick={handleBack}
        aria-label="Login Icon"
      />
      <form style={{ display: "none" }} id="sign-up-form" onSubmit={handleSubmit}></form>
      <Flex
        direction={"column"}
        minW={"280px"}
        maxW={"600px"}
        w={"100%"}
        gap={8}
        bgColor={"light.300"}
        rounded={"md"}
        p={4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text w={"100%"} textAlign={"center"} as={"h1"} textStyle={"heading-h1-md"}>
          Sign Up
        </Text>
        <CustomInput
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder="Enter your Username"
          form="sign-up-form"
          required
          variant={"flushed"}
          value={formData.username}
          onChange={handleChange}
        />
        <CustomPasswordInput
          name="password"
          id="password"
          placeholder="Enter your Password"
          form="sign-up-form"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Button form="sign-up-form" type={"submit"} variant={"blue-solid"}>
          <Text pos={"relative"} zIndex={1} layerStyle={"flex-center"} gap={"12px"}>
            Submit
          </Text>
        </Button>
        <Link href="/sign-up" _hover={{}}>
          <Text> Already a User? Log in</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
