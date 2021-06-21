import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { SettingsScreen } from "../../features/profile/screens/settings.screen";
import { EditProfileScreen } from "../../features/profile/screens/edit-profile.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="ViewPosting" component={ViewPostingScreen} />
    </ProfileStack.Navigator>
  );
};
