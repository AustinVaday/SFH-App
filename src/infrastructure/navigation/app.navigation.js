import React from "react";
import { Icon } from "react-native-elements";

import { AppTabsNavigator } from "./app-bottom-tabs.navigation";

import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from "@react-navigation/stack";

import { NewMessageScreen } from "../../features/chat/screens/new-message.screen";
import { ConversationScreen } from "../../features/chat/screens/conversation.screen";
import { ViewPostScreen } from "../../features/app/screens/view-post.screen";
import { SettingsScreen } from "../../features/profile/screens/settings.screen";
import { FollowListScreen } from "../../features/profile/screens/follow-list.screen";
import { EditProfileScreen } from "../../features/profile/screens/edit-profile.screen";
import { NameEditScreen } from "../../features/profile/screens/name-edit.screen";
import { UsernameEditScreen } from "../../features/profile/screens/username-edit.screen";
import { BioEditScreen } from "../../features/profile/screens/bio-edit.screen";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ActivityScreen } from "../../features/home/screens/activity.screen";
import { LibraryScreen } from "../../features/add/screens/library.screen";
import { CameraScreen } from "../../features/add/screens/camera.screen";
import { UploadPostScreen } from "../../features/add/screens/upload-post.screen";
import { PreviewScreen } from "../../features/add/screens/preview.screen";

import { SaveRightHeader } from "../components/save-right-header.components";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

const AppStack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const AppNavigator = (props) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={AppTabsNavigator}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Activity"
        component={ActivityScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="navbar_title">Activity</Text>,
          headerTintColor: colors.text.black,
        })}
      />
      <AppStack.Screen
        name="ViewPost"
        component={ViewPostScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="NewMessage"
        component={NewMessageScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="navbar_title">New Message</Text>,
          headerTintColor: colors.text.black,
        })}
      />
      <AppStack.Screen
        name="Conversation"
        component={ConversationScreen}
        navigation={props.navigation}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Text variant="navbar_title">{route.params.user}</Text>
          ),
          headerTintColor: colors.text.black,
          headerRight: () => (
            <Icon
              name="dots-horizontal"
              type="material-community"
              onPress={() => {}}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="GuestProfile"
        component={ProfileScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Settings"
        component={SettingsScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Settings</Text>,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        })}
      />
      <AppStack.Screen
        name="FollowList"
        component={FollowListScreen}
        navigation={props.navigation}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => (
            <Text variant="navbar_title">{route.params.username}</Text>
          ),
          headerLeft: (props) => <HeaderBackButton {...props} />,
        })}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Edit Profile</Text>,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        })}
      />
      <AppStack.Screen
        name="NameEdit"
        component={NameEditScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Name</Text>,
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerRight: () => (
            <SaveRightHeader
              params={route.params}
              onNavigate={navigation.goBack}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="UsernameEdit"
        component={UsernameEditScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Username</Text>,
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerRight: () => (
            <SaveRightHeader
              params={route.params}
              onNavigate={navigation.goBack}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="BioEdit"
        component={BioEditScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Bio</Text>,
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerRight: () => (
            <SaveRightHeader
              params={route.params}
              onNavigate={navigation.goBack}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="Library"
        component={LibraryScreen}
        navigation={props.navigation}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <AppStack.Screen
        name="Camera"
        component={CameraScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Preview"
        component={PreviewScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="UploadPost"
        component={UploadPostScreen}
        navigation={props.navigation}
        options={{ headerShown: false}}
      />
    </AppStack.Navigator>
  );
};
