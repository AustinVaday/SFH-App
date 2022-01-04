import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../../infrastructure/theme/colors";
import { Ionicons } from "@expo/vector-icons";

import { PostsTab } from "../components/posts-tab.components";
import { SavesTab } from "../components/saves-tab.components";

const { width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

export const ProfileTabs = ({ user }) => {
  return (
    <Tab.Navigator
      lazy={true}
      tabBarOptions={{
        activeTintColor: colors.icon.primary,
        inactiveTintColor: colors.icon.lightgray,
        showIcon: true,
        showLabel: false,
        indicatorStyle: { width: width / 4, left: width / 8 },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsTab}
        initialParams={{ user: user }}
        listeners={({ navigation }) => ({
          //tabPress:
          focus: (event) => {
            // event.preventDefault();
            navigation.navigate("Posts");
          },
        })}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"file-tray-full-outline"} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Saves"
        component={SavesTab}
        initialParams={{ user: user }}
        listeners={({ navigation }) => ({
          //tabPress:
          focus: (event) => {
            // event.preventDefault();
            navigation.navigate("Saves");
          },
        })}
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
