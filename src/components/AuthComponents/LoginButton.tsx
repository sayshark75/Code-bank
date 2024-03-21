import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "universal-cookie";

const LoginButton = ({ type = "desk" }: { type?: string }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const cookie = useMemo(() => {
    return new Cookies(null, { path: "/" });
  }, []);
  const navigation = useRouter();
  const handleNavigation = () => {
    if (!loggedIn) {
      navigation.push("login");
    }
  };

  const handleSignOut = () => {
    try {
      cookie.remove("accessToken");
      cookie.remove("refreshToken");
      navigation.replace("login");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (cookie.get("accessToken")) {
      setLoggedIn(true);
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
              Hi! User
            </Text>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
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
