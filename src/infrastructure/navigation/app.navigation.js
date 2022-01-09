import React, { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { Icon } from "react-native-elements";

import { AppTabsNavigator } from "./app-bottom-tabs.navigation";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { HeaderBackButton } from "@react-navigation/elements";

import { NewConversationScreen } from "../../features/chat/screens/new-conversation.screen";
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

export const AppNavigator = (props) => {
  const notificationListener = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { user, message, type } =
          notification?.request?.content?.data ?? {};

        if (type === "chat") {
          Toast.show({
            type: "newMessage",
            onPress: () =>
              props.navigation.navigate("Conversation", { user: user }),
            props: {
              avatar: user.profilePhoto,
              name: user.displayName,
              message: message,
            },
            topOffset: 45,
          });
        }

        return;
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

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
        name="NewConversation"
        component={NewConversationScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="navbar_title">New Chat</Text>,
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
            <Text variant="navbar_title">{route.params.user.username}</Text>
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
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
