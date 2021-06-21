import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeNavigator } from "./home.navigation";
import { PostNavigator } from "./post.navigation";
import { InboxNavigator } from "./inbox.navigation";
import { ProfileNavigator } from "./profile.navigation";
import { TrendingNavigator } from "./trending.navigation";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "md-home",
  Trending: "md-trending-up",
  Post: "md-add",
  Inbox: "md-chatbubbles",
  Profile: "md-person",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: colors.brand.primary,
      inactiveTintColor: colors.brand.muted,
    }}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Trending" component={TrendingNavigator} />
    <Tab.Screen
      name="Post"
      component={PostNavigator}
      options={{ tabBarVisible: false }}
    />
    <Tab.Screen name="Inbox" component={InboxNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
);
