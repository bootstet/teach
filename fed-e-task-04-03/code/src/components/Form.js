import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  useColorModeValue
} from "@chakra-ui/core";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Form() {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <Box bgColor={bgColor} p={3} w="100%" boxShadow="lg" borderRadius="lg">
      <Tabs isFitted>
        <TabList>
          <Tab _focus={{ boxShadow: "none" }} _selected={{ color: "#e6af5a" }}>登录</Tab>
          <Tab _focus={{ boxShadow: "none" }} _selected={{ color: "#e6af5a" }}>注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignUp />
          </TabPanel>
          <TabPanel>
            <SignIn />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
