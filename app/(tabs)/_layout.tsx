
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="recordings/index" />
    </Tabs>
  );
};

export default TabLayout;