import React from "react";
import { Text } from "../../components/typography/text.components";
import { IconButton } from "react-native-paper";

import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { SettingsScreen } from "../../features/profile/screens/settings.screen";
import { FollowListScreen } from "../../features/profile/screens/follow-list.screen";
import { EditProfileScreen } from "../../features/profile/screens/edit-profile.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";

import userProfile from "../../utils/mock/userProfile";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  const userName = userProfile.map((index) => index.name);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          // headerStyle: { height: 120 },
          headerTitle: null,
          headerTintColor: "black",
          headerLeft: () => (
            <Text variant="title" style={{ paddingLeft: 15 }}>
              {userName}
            </Text>
          ),
          headerRight: () => (
            <IconButton
              icon="dots-horizontal"
              onPress={() => navigation.navigate("Settings")}
            />
          ),
        })}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Settings",
          headerTitleStyle: { fontFamily: "OpenSans_700Bold" },
          headerTintColor: "black",
          headerLeft: (props) => (
            <HeaderBackButton {...props} />
          ),
        })}
      />
      <ProfileStack.Screen
        name="FollowList"
        component={FollowListScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          // headerStyle: { height: 120 },
          headerTitle: route.params.item.name,
          headerTintColor: "black",
          headerLeft: (props) => (
            <HeaderBackButton {...props} />
          ),
        })}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ViewPosting"
        component={ViewPostingScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
