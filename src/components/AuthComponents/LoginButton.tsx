import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

const LoginButton = ({ type = "desk" }: { type?: string }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("User");
  const toast = useToast();
  const cookie = useMemo(() => {
    return new Cookies(null, { path: "/" });
  }, []);
  const navigation = useRouter();
  const handleNavigation = () => {
    if (!loggedIn) {
      navigation.push("login");
    }
  };

  const handlePath = (path: string) => {
    navigation.push(path);
  };

  const handleSignOut = () => {
    try {
      cookie.remove("accessToken");
      cookie.remove("refreshToken");
      navigation.replace("login");
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

  useEffect(() => {
    const token = cookie.get("accessToken");
    if (token) {
      setLoggedIn(true);
      const data = jwt.decode(token);
      if (data && typeof data !== "string" && data.username) {
        setUsername(data.username);
      }
    } else {
      setLoggedIn(false);
    }
  }, [cookie]);
  return (
    <Flex>
      {loggedIn ? (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaRegUserCircle />}
            ml={type === "desk" ? 4 : 0}
            display={type === "desk" ? ["none", "none", "flex"] : "flex"}
            fontSize={"22px"}
            aria-label="Logout Icon"
            bgColor={"light.200"}
            border={"1px solid"}
            borderColor={"light.300"}
            rounded={"full"}
          />
          {/* Show User Name */}
          {/* show logout */}
          <MenuList bgColor={"light.300"}>
            <Text textStyle={"p-lg"} mb={5}>
              Hi! {username}
            </Text>
            <MenuItem bgColor={"light.200"} mb={1} letterSpacing={"2px"} onClick={() => handlePath("favorites-page")}>
              Favorites
            </MenuItem>
            <MenuItem bgColor={"light.200"} mb={1} letterSpacing={"2px"} onClick={handleSignOut}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <IconButton
          fontSize={"22px"}
          bgColor={"light.200"}
          border={"1px solid"}
          borderColor={"light.300"}
          rounded={"full"}
          icon={<BiSolidLogInCircle />}
          aria-label="Login Icon"
          onClick={handleNavigation}
          ml={type === "desk" ? 4 : 0}
          display={type === "desk" ? ["none", "none", "flex"] : "flex"}
        />
      )}
    </Flex>
  );
};

export default LoginButton;
