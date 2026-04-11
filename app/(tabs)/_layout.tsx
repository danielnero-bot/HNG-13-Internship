import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from '@expo/vector-icons/Ionicons';

const tabs = [
  {
    name: "index",
    title: "Home",
    icon: ({ color }: { color: string }) => (
      <IconSymbol size={28} name="house.fill" color={color} />
    ),
  },
  {
    name: "explore",
    title: "History",
    icon: ({ color }: { color: string }) => (
      <AntDesign name="history" size={24} color={color} />
    ),
  },
  {
    name: "settings",
    title: "Settings",
    icon: ({ color }: { color: string }) => (
      <Ionicons name="settings-sharp" size={24} color={color} />
    ),
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#10131a",
        },
        tabBarButton: HapticTab,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: tab.icon,
          }}
        />
      ))}
    </Tabs>
  );
}
