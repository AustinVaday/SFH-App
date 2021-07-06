import React from "react";
import { Text } from "../../components/typography/text.components";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { IconButton } from "react-native-paper";

import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { SettingsScreen } from "../../features/profile/screens/settings.screen";
import { FollowListScreen } from "../../features/profile/screens/follow-list.screen";
import { EditProfileScreen } from "../../features/profile/screens/edit-profile.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";
import { NameEditScreen } from "../../features/profile/screens/name-edit.screen";
import { UsernameEditScreen } from "../../features/profile/screens/username-edit.screen";
import { BioEditScreen } from "../../features/profile/screens/bio-edit.screen";

import { SaveRightHeader } from "../components/save-right-header.components";

import userProfile from "../../utils/mock/userProfile";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  const userName = userProfile.map((index) => index.username);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: null,
          headerTintColor: colors.text.primary,
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
          headerTitleStyle: { fontFamily: fonts.body_700 },
          headerTintColor: colors.text.primary,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        })}
      />
      <ProfileStack.Screen
        name="FollowList"
        component={FollowListScreen}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: route.params.item.name,
          headerTintColor: colors.text.primary,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        })}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Edit Profile",
          headerTitleStyle: { fontFamily: fonts.body_700 },
          headerTintColor: colors.text.primary,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        })}
      />
      <ProfileStack.Screen
        name="NameEdit"
        component={NameEditScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Name",
          headerTitleStyle: { fontFamily: fonts.body_700 },
          headerTintColor: colors.text.primary,
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerRight: () => (
            <SaveRightHeader
              nameChange={route.params.name}
              onNavigate={navigation.pop}
            />
          ),
        })}
      />
      <ProfileStack.Screen
        name="UsernameEdit"
        component={UsernameEditScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Username",
          headerTitleStyle: { fontFamily: fonts.body_700 },
          headerTintColor: colors.text.primary,
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerRight: () => (
            <SaveRightHeader
              nameChange={route.params.username}
              onNavigate={navigation.pop}
            />
          ),
        })}
      />
      <ProfileStack.Screen
        name="BioEdit"
        component={BioEditScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Bio",
          headerTitleStyle: { fontFamily: fonts.body_700 },
          headerTintColor: colors.text.primary,
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerRight: () => (
            <SaveRightHeader
              nameChange={route.params.bio}
              onNavigate={navigation.pop}
            />
          ),
        })}
      />
      <ProfileStack.Screen
        name="ViewPosting"
        component={ViewPostingScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
