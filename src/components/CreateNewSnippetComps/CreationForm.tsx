"use client";
import { Button, Flex, Grid, GridItem, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CreationForm = () => {
  const toast = useToast();
  const { data } = useSession();
  const [progress, setProgress] = React.useState({
    loading: false,
    success: false,
    error: "",
  });

  const router = useRouter();
  const [formData, setFormData] = React.useState<{
    title: string;
    description: string;
    code: string;
    tags: string;
    language: string;
    version: string;
  }>({
    title: "",
    description: "",
    code: "",
    tags: "",
    language: "",
    version: "1.0.0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setProgress({ loading: true, success: false, error: "" });

    if (formData.tags.length === 0) {
      setProgress({ loading: false, success: false, error: "Please add at least one tag" });
      return;
    }
    const res = await fetch("/api/snippets/create", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        creatorId: data?.user.id,
        code: btoa(formData.code),
      }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    if (res.ok) {
      setProgress({ loading: false, success: true, error: "" });
      toast({
        title: "Success",
        description: "Snippet created successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      router.push("/snippets");
    } else {
      setProgress({ loading: false, success: false, error: "Something went wrong" });
    }
  };

  useEffect(() => {
    let id = undefined;
    if (progress.error) {
      id = setTimeout(() => {
        setProgress({ loading: false, success: false, error: "" });
      }, 5000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [progress.error]);

  return (
    <Grid
      onSubmit={handleSubmit}
      templateColumns={["1fr", "1fr", "1fr", "repeat(3, 1fr)"]}
      gap={2}
      w={"100%"}
      maxW={["340px", "330px", "720px", "1080px"]}
      p={5}
      rounded={"lg"}
      border={"1px solid"}
      borderColor={"light.200"}
      bgColor={"light.100"}
      color={"dark.100"}
      as="form"
      boxShadow={"0px 0px 20px 0px #ffffff2a"}
    >
      <GridItem w={"100%"} colStart={1} colEnd={[1, 1, 1, 4]}>
        <Text w={"100%"} textAlign={"start"} textStyle={"p-lg"}>
          Create New Snippet
        </Text>
      </GridItem>
      <GridItem w={"100%"}>
        <Input
          _placeholder={{ color: "dark.400" }}
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          placeholder="Snippet Title: Name of the snippet"
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
          minLength={2}
          title="Snippet Title: Name of the snippet"
        />
      </GridItem>

      <GridItem w={"100%"}>
        <Input
          _placeholder={{ color: "dark.400" }}
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          placeholder="Snippet Language: Type of programming language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
          minLength={2}
          title="Snippet Language: Type of programming language"
        />
      </GridItem>

      <GridItem w={"100%"}>
        <Input
          _placeholder={{ color: "dark.400" }}
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          placeholder="Snippet tags: Seperated by comma"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          required
          minLength={3}
          title="Snippet tags: Seperated by comma"
        />
      </GridItem>

      <GridItem w={"100%"} colStart={1} colEnd={[1, 1, 1, 4]}>
        <Textarea
          w={"100%"}
          _placeholder={{ color: "dark.400" }}
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          placeholder="Snippet Description: Information about usage, precautions, etc..."
          rows={6}
          name="description"
          value={formData.description}
          onChange={handleChange}
          minLength={10}
          required
          title="Snippet Description: Information about usage, precautions, etc..."
        />
      </GridItem>

      <GridItem w={"100%"} colStart={1} colEnd={[1, 1, 1, 4]}>
        <Textarea
          _placeholder={{ color: "dark.400" }}
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          placeholder="Snippet Code: Code of the snippet"
          rows={6}
          name="code"
          value={formData.code}
          onChange={handleChange}
          minLength={10}
          required
          title="Snippet Code: Code of the snippet"
        />
      </GridItem>
      <GridItem w={"100%"} colStart={[1, 1, 1, 3]} colEnd={[1, 1, 1, 4]}>
        <Input
          title="Snippet Version: Version of the snippet"
          _placeholder={{ color: "dark.400" }}
          fontSize={["xs", "13px"]}
          borderColor={"light.300"}
          placeholder="Snippet Version: Version of the snippet"
          name="version"
          value={formData.version}
          onChange={handleChange}
          required
          minLength={1}
        />
      </GridItem>
      <GridItem w={"100%"} colStart={1} colEnd={[1, 1, 1, 4]} as={Flex} justify={"flex-end"} align={"center"}>
        <Flex w={"100%"} direction={"column"} justify={"center"} align={"flex-end"}>
          {progress.error && (
            <Text fontSize={"12px"} color={"red.200"}>
              {progress.error}
            </Text>
          )}
          <Button
            isDisabled={progress.loading || progress.success}
            type="submit"
            fontSize={"12px"}
            fontWeight={400}
            bgColor={"light.200"}
            color={"dark.100"}
          >
            {progress.loading ? "Creating..." : "Create Snippet"}
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default CreationForm;
