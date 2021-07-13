import React, { useState } from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../../infrastructure/theme/colors";
import { Ionicons } from "@expo/vector-icons";

import { PostsTab } from "../components/posts-tab.components";
import { SavesTab } from "../components/saves-tab.components";

const { width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

export const ProfileTabs = ({ newitem }) => {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.brand.primary,
        inactiveTintColor: "#BABBBA",
        showIcon: true,
        showLabel: false,
        indicatorStyle: { width: width / 4, left: width / 8 },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={activeTab === "Posts" ? PostsTab : SavesTab}
        initialParams={{ newitem: newitem }}
        listeners={{ focus: () => setActiveTab("Posts") }}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"file-tray-full-outline"} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Saves"
        component={activeTab === "Saves" ? SavesTab : PostsTab}
        initialParams={{ newitem: newitem }}
        listeners={{ focus: () => setActiveTab("Saves") }}
        options={{
          tabBarLabel: "Saves",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"bookmark-outline"} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
