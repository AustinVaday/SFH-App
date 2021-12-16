import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ChatsScreen } from "../../features/chat/screens/chats.screen";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { DiscoverScreen } from "../../features/discover/screens/discover.screen";

import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import { colors } from "../theme/colors";

import { useSelector } from "react-redux";

const AppTab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Discover: "magnify",
  Add: "plus-box",
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

export const AppTabsNavigator = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <AppTab.Navigator
      initialRouteName="Home"
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: colors.icon.primary,
        inactiveTintColor: colors.icon.lightgray,
        showLabel: false,
      }}
    >
      <AppTab.Screen
        name="Home"
        component={HomeScreen}
        navigation={props.navigation}
      />
      <AppTab.Screen
        name="Discover"
        component={DiscoverScreen}
        navigation={props.navigation}
      />
      <AppTab.Screen
        name="Add"
        component={View}
        navigation={props.navigation}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Library");
          },
        })}
      />
      <AppTab.Screen
        name="Chat"
        component={ChatsScreen}
        navigation={props.navigation}
      />
      <AppTab.Screen
        name="Profile"
        component={ProfileScreen}
        navigation={props.navigation}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Profile", {
              uid: currentUser.id,
              guestUser: false,
            });
          },
        })}
      />
    </AppTab.Navigator>
  );
};
