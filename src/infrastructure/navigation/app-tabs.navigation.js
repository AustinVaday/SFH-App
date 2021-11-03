import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeNavigator } from "./home.navigation";
import { PostNavigator } from "./post.navigation";
import { ChatNavigator } from "./chat.navigation";
import { ProfileNavigator } from "./profile.navigation";
import { TrendingNavigator } from "./trending.navigation";

import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import { colors } from "../theme/colors";

import { firebase } from "../../utils/firebase";

const AppTab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Trending: "trending-up",
  Post: "plus-box",
  Chat: "forum",
  Profile: "account",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <MCIcon name={iconName} size={size} color={color} />
    ),
  };
};

export const AppTabsNavigator = (props) => (
  <AppTab.Navigator
    initialRouteName="Home"
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: colors.brand.primary,
      inactiveTintColor: colors.bg.tertiary,
      showLabel: false,
    }}
  >
    <AppTab.Screen name="Home" component={HomeNavigator} />
    <AppTab.Screen name="Trending" component={TrendingNavigator} />
    <AppTab.Screen
      name="Post"
      component={PostNavigator}
      options={{ tabBarVisible: false }}
    />
    <AppTab.Screen name="Chat" component={ChatNavigator} />
    <AppTab.Screen
      name="Profile"
      navigation={props.navigation}
      listeners={({ navigation }) => ({
        tabPress: (event) => {
          event.preventDefault();
          navigation.navigate("Profile", {
            screen: "Profile",
            params: { uid: firebase.auth().currentUser.uid, guestUser: undefined },
          });
        },
      })}
      component={ProfileNavigator}
    />
  </AppTab.Navigator>
);
