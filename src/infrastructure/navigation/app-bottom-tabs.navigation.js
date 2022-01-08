import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ChatsScreen } from "../../features/chat/screens/chats.screen";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { DiscoverScreen } from "../../features/discover/screens/discover.screen";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

import { useSelector } from "react-redux";

const AppTab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "ios-home",
  Discover: "ios-search",
  Add: "add-circle",
  Chat: "chatbox-ellipses",
  Profile: "person-circle-sharp",
};

const UNFOCUSED_TAB_ICON = {
  Home: "ios-home-outline",
  Discover: "ios-search-outline",
  Add: "add-circle",
  Chat: "chatbox-ellipses-outline",
  Profile: "person-circle-outline",
};

const TAB_ICON_SIZE = {
  Home: 30,
  Discover: 30,
  Add: 50,
  Chat: 30,
  Profile: 30,
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  const unfocusedIconName = UNFOCUSED_TAB_ICON[route.name];
  const iconSize = TAB_ICON_SIZE[route.name];

  return {
    tabBarIcon: ({ focused, color }) => (
      <Ionicons name={focused ? iconName : unfocusedIconName} size={iconSize} color={color} />
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
        inactiveTintColor: colors.icon.lightergray,
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
