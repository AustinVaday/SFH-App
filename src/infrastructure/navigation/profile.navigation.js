import React from "react";
import { Text } from "../../components/typography/text.components";

import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { SettingsScreen } from "../../features/profile/screens/settings.screen";
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
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          // headerStyle: { height: 120 },
          headerTitle: null,
          headerTintColor: "black",
          headerLeft: () => (
            <Text variant="title" style={{paddingLeft: 20}}>{userName}</Text>
          ),
          // headerRight: () => <ViewPostingRightHeader />,
        })}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
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
