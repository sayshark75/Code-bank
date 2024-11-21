"use client";
import { Box, Button, Flex, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = React.useState([false, false]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const toast = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (data.password !== data.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const responseData = await res.json();

    if (responseData.success) {
      setError("");
      setLoading(false);
      toast({
        title: "Creator Account Created",
        description: "Please login to continue.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } else {
      setError(responseData.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    let id: NodeJS.Timeout | undefined = undefined;

    id = setTimeout(() => {
      setError("");
    }, 4000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <Box w={"100%"} maxW={"350px"} p={2} rounded={"lg"} bgColor={"light.100"}>
      <Text color={"dark.100"} mb={5} fontSize={["14px", "18px"]}>
        Sign Up
      </Text>
      {error && (
        <Text fontSize={"xs"} color={"red.500"}>
          {error}
        </Text>
      )}
      <Box as="form" onSubmit={handleSubmit} w={"100%"}>
        <Input
          fontSize={["xs", "13px"]}
          type="text"
          placeholder="Enter your name"
          mb={3}
          borderColor={"light.300"}
          required
          minLength={2}
          name="name"
          onChange={handleInputChange}
          value={data.name}
          autoComplete="name"
        />
        <Input
          fontSize={["xs", "13px"]}
          type="text"
          placeholder="Username (visible in snippets)"
          mb={3}
          borderColor={"light.300"}
          required
          minLength={2}
          name="username"
          onChange={handleInputChange}
          value={data.username}
          autoComplete="username"
        />
        <Input
          fontSize={["xs", "13px"]}
          type="email"
          placeholder="Enter your email"
          mb={3}
          borderColor={"light.300"}
          required
          minLength={5}
          name="email"
          onChange={handleInputChange}
          value={data.email}
          autoComplete="email"
        />
        <Flex w={"100%"} gap={2}>
          <Input
            fontSize={["xs", "13px"]}
            required
            minLength={8}
            type={showPassword[0] ? "text" : "password"}
            placeholder="Enter your password"
            mb={3}
            borderColor={"light.300"}
            name="password"
            onChange={handleInputChange}
            value={data.password}
            autoComplete="new-password"
          />
          <IconButton
            overflow={"hidden"}
            bgColor={"light.100"}
            border={"1px solid"}
            borderColor={"light.300"}
            onClick={() => setShowPassword([!showPassword[0], showPassword[1]])}
            icon={showPassword[0] ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
            aria-label="Password Icon Button"
          />
        </Flex>
        <Box>
          <Flex w={"100%"} gap={2}>
            <Input
              fontSize={["xs", "13px"]}
              required
              minLength={8}
              type={showPassword[1] ? "text" : "password"}
              placeholder="Confirm password"
              mb={8}
              borderColor={"light.300"}
              name="confirm_password"
              onChange={handleInputChange}
              value={data.confirm_password}
              autoComplete="new-password"
            />
            <IconButton
              overflow={"hidden"}
              bgColor={"light.100"}
              border={"1px solid"}
              borderColor={"light.300"}
              onClick={() => setShowPassword([showPassword[0], !showPassword[1]])}
              icon={showPassword[1] ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
              aria-label="Confirm Password Icon Button"
            />
          </Flex>
        </Box>
        <Button isDisabled={loading} _hover={{}} type="submit" w={"100%"} bgColor={"dark.100"} color={"light.100"}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpForm;
