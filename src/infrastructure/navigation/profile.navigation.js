import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../../screens/ProfileScreen";
import { SettingScreen } from "../../screens/SettingScreen";
import { EditProfileScreen } from "../../screens/EditProfileScreen";
import { ViewPostingScreen } from "../../screens/ViewPostingScreen";
import { FollowListScreen } from "../../screens/FollowListScreen";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Setting" component={SettingScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="ViewPosting" component={ViewPostingScreen} />
      <ProfileStack.Screen name="FollowList" component={FollowListScreen} />
    </ProfileStack.Navigator>
  );
};
