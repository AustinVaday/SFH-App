import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ChatsScreen } from "../../features/chat/screens/chats.screen";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { DiscoverScreen } from "../../features/discover/screens/discover.screen";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

import { useSelector } from "react-redux";

const AppTab = createBottomTabNavigator();

const TAB_ICON = {
  Feed: "ios-home",
  Discover: "ios-search",
  Add: "add-circle",
  Chat: "chatbox-ellipses",
  Profile: "person-circle-sharp",
};

const UNFOCUSED_TAB_ICON = {
  Feed: "ios-home-outline",
  Discover: "ios-search-outline",
  Add: "add-circle",
  Chat: "chatbox-ellipses-outline",
  Profile: "person-circle-outline",
};

const TAB_ICON_SIZE = {
  Feed: 30,
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
    tabBarShowLabel: false,
    tabBarActiveTintColor: colors.icon.primary,
    tabBarInactiveTintColor: colors.icon.lightergray,
  };
};

export const AppTabsNavigator = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <AppTab.Navigator
      initialRouteName="Feed"
      screenOptions={createScreenOptions}
    >
      <AppTab.Screen
        name="Feed"
        component={HomeScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerLeftContainerStyle: { paddingLeft: 8 },
          headerRightContainerStyle: { paddingRight: 8 },
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Explore</Text>,
          headerRight: () => (
            <Icon
              name="bell-outline"
              type="material-community"
              onPress={() => {}}
            />
          ),
          headerLeft: () => <Text variant="navbar_title">SFH</Text>,
        })}
      />
      <AppTab.Screen
        name="Discover"
        component={DiscoverScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppTab.Screen
        name="Add"
        component={View}
        navigation={props.navigation}
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />
      <AppTab.Screen
        name="Profile"
        component={ProfileScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
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
