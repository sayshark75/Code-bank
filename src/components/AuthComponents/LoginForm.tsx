"use client";
import { Box, Button, Flex, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const toast = useToast();
  const router = useRouter();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false, // Don't automatically redirect
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      router.push("/snippets");
      setLoading(false);
      setError("");
      setSuccess(true);

      toast({
        title: "Login successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setData({ email: "", password: "" });
    } else {
      setSuccess(false);
      setLoading(false);
      setError(result?.error || "");
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (error) {
      let id = undefined;

      id = setTimeout(() => {
        setError("");
      }, 4000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [error]);

  return (
    <Box w={"100%"} maxW={"350px"} p={2} rounded={"lg"} bgColor={"light.100"}>
      <Text color={"dark.100"} mb={5} fontSize={["14px", "18px"]}>
        Login
      </Text>
      {error && (
        <Text fontSize={"xs"} color={"red.500"} textAlign={"center"}>
          {error === "CredentialsSignin" ? "Invalid email or password" : error}
        </Text>
      )}
      <Box as="form" onSubmit={handleLogin} w={"100%"}>
        <Input
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          mb={3}
          type="email"
          placeholder="Enter your email"
          required
          minLength={5}
          onChange={handleChange}
          name="email"
          value={data.email}
        />
        <Flex w={"100%"} gap={2}>
          <Input
            fontSize={["xs", "13px"]}
            required
            minLength={8}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            mb={8}
            borderColor={"light.300"}
            onChange={handleChange}
            name="password"
            value={data.password}
          />
          <IconButton
            overflow={"hidden"}
            bgColor={"light.100"}
            border={"1px solid"}
            borderColor={"light.300"}
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
            aria-label="Search Icon Button"
          />
        </Flex>

        <Button isDisabled={loading || success} _hover={{}} type="submit" w={"100%"} bgColor={"dark.100"} color={"light.100"}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
