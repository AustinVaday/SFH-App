import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ChatsScreen } from "../../features/chat/screens/chats.screen";
import { FeedScreen } from "../../features/home/screens/feed.screen";
import { DiscoverScreen } from "../../features/discover/screens/discover.screen";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";
import { APP_NAME } from "../../utils/constants";

import { useSelector } from "react-redux";

const AppTab = createBottomTabNavigator();

const TAB_ICON = {
  Feed: "home",
  Discover: "search",
  Add: "plus-circle",
  Chat: "comments",
  Profile: "user",
};

const TAB_ICON_SIZE = {
  Feed: 30,
  Discover: 25,
  Add: 45,
  Chat: 30,
  Profile: 28,
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  const iconSize = TAB_ICON_SIZE[route.name];

  return {
    tabBarIcon: ({ color }) => (
      <FontAwesome name={iconName} size={iconSize} color={color} />
    ),
    tabBarShowLabel: false,
    tabBarActiveTintColor: colors.icon.primary,
    tabBarInactiveTintColor: colors.icon.lightestgray,
  };
};

export const AppTabsNavigator = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <AppTab.Navigator
      initialRouteName="Feed"
      screenOptions={createScreenOptions}
    >
      <AppTab.Screen
        name="Feed"
        component={FeedScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerLeftContainerStyle: { paddingLeft: 12 },
          headerRightContainerStyle: { paddingRight: 12 },
          headerTitleContainerStyle: { marginHorizontal: -20 },
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: "",
          headerRight: () => (
            <Icon
              name="bell-outline"
              type="material-community"
              onPress={() => navigation.navigate("Activity")}
            />
          ),
          headerLeft: () => <Text variant="home_logo">{APP_NAME}</Text>,
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
            navigation.navigate("Camera");
          },
        })}
      />
      <AppTab.Screen
        name="Chat"
        component={ChatsScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerRightContainerStyle: { paddingRight: 6 },
          tabBarBadge: null,
          tabBarBadgeStyle: { minWidth: 18, height: 18 },
          headerTitle: () => <Text variant="navbar_title">Chat</Text>,
          headerRight: () => (
            <Icon
              name="plus"
              type="material-community"
              size={30}
              onPress={() => navigation.navigate("NewConversation")}
            />
          ),
        })}
      />
      <AppTab.Screen
        name="Profile"
        component={ProfileScreen}
        navigation={props.navigation}
        options={{
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerRightContainerStyle: {
            paddingRight: Platform.OS === "ios" ? 6 : 0,
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Profile", {
              uid: currentUser.id,
              isGuest: false,
              isOtherUser: false,
            });
          },
        })}
      />
    </AppTab.Navigator>
  );
};
