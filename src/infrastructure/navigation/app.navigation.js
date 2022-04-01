import React, { useEffect, useRef } from "react";
import { Platform, AppState } from "react-native";
import {
  addNotificationReceivedListener,
  removeNotificationSubscription,
} from "expo-notifications";
import Toast from "react-native-toast-message";

import { AppTabsNavigator } from "./app-bottom-tabs.navigation";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { NewConversationScreen } from "../../features/chat/screens/new-conversation.screen";
import { ConversationScreen } from "../../features/chat/screens/conversation.screen";
import { ViewWordScreen } from "../../features/app/screens/view-word.screen";
import { SettingsScreen } from "../../features/profile/screens/settings/settings.screen";
import { FollowListScreen } from "../../features/profile/screens/follow-list.screen";
import { EditProfileScreen } from "../../features/profile/screens/edit-profile/edit-profile.screen";
import { NameEditScreen } from "../../features/profile/screens/edit-profile/name-edit.screen";
import { UsernameEditScreen } from "../../features/profile/screens/edit-profile/username-edit.screen";
import { BioEditScreen } from "../../features/profile/screens/edit-profile/bio-edit.screen";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ActivityScreen } from "../../features/home/screens/activity/activity.screen";
import { LibraryScreen } from "../../features/add/screens/library.screen";
import { CameraScreen } from "../../features/add/screens/camera.screen";
import { UploadWordScreen } from "../../features/add/screens/upload-word.screen";
import { PreviewScreen } from "../../features/add/screens/preview.screen";
import { ResultsSearchScreen } from "../../features/discover/screens/search/results-search.screen";
import { LanguagesEditScreen } from "../../features/profile/screens/edit-profile/languages-edit.screen";
import { IdentifyEditScreen } from "../../features/profile/screens/edit-profile/identify-edit.screen";
import { ConfirmationCodeScreen } from "../../features/profile/screens/settings/confirmation-code.screen";
import { ChangeEmailScreen } from "../../features/profile/screens/settings/change-email.screen";
import { ChangePasswordScreen } from "../../features/profile/screens/settings/change-password.screen";
import { CurrentPasswordScreen } from "../../features/profile/screens/settings/current-password.screen";
import { FavoritesScreen } from "../../features/profile/screens/favorites.screen";

import { SaveRightHeader } from "../components/save-right-header.components";
import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

import { useDispatch } from "react-redux";
import { checkNotificationStatus } from "../../services/redux/actions/notifications.actions";

const AppStack = createStackNavigator();

export const AppNavigator = (props) => {
  const notificationListener = useRef();
  const appState = useRef(AppState.currentState);

  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    if (subscription !== undefined) {
      return () => {
        subscription.remove();
      };
    }
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      dispatch(checkNotificationStatus());
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = addNotificationReceivedListener(
      (notification) => {
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
      }
    );

    return () => {
      removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return (
    <AppStack.Navigator screenOptions={{ headerMode: "screen" }}>
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
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="navbar_title">Activity</Text>,
          headerTintColor: colors.text.black,
        })}
      />
      <AppStack.Screen
        name="ViewWord"
        component={ViewWordScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="NewConversation"
        component={NewConversationScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
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
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerRightContainerStyle: { paddingRight: 6 },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Text variant="navbar_title">{route.params.user.username}</Text>
          ),
          headerTintColor: colors.text.black,
        })}
      />
      <AppStack.Screen
        name="GuestProfile"
        component={ProfileScreen}
        navigation={props.navigation}
        options={{
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerRightContainerStyle: {
            paddingRight: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
        }}
      />
      <AppStack.Screen
        name="Settings"
        component={SettingsScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Settings</Text>,
        })}
      />
      <AppStack.Screen
        name="ConfirmationCode"
        component={ConfirmationCodeScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: "",
        })}
      />
      <AppStack.Screen
        name="ChangeEmail"
        component={ChangeEmailScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Change Email</Text>,
        })}
      />
      <AppStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => (
            <Text variant="navbar_title">Change Password</Text>
          ),
        })}
      />
      <AppStack.Screen
        name="CurrentPassword"
        component={CurrentPasswordScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => (
            <Text variant="navbar_title">Current Password</Text>
          ),
        })}
      />
      <AppStack.Screen
        name="FollowList"
        component={FollowListScreen}
        navigation={props.navigation}
        options={({ route }) => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => (
            <Text variant="navbar_title">{route.params.username}</Text>
          ),
        })}
      />
      <AppStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Favorites</Text>,
        })}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        navigation={props.navigation}
        options={() => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Edit Profile</Text>,
        })}
      />
      <AppStack.Screen
        name="NameEdit"
        component={NameEditScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Name</Text>,
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
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Username</Text>,
          headerRight: () => (
            <SaveRightHeader
              params={route.params}
              onNavigate={navigation.goBack}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="IdentifyEdit"
        component={IdentifyEditScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Identify</Text>,
          headerRight: () => (
            <SaveRightHeader
              params={route.params}
              onNavigate={navigation.goBack}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="LanguagesEdit"
        component={LanguagesEditScreen}
        navigation={props.navigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Languages</Text>,
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
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Bio</Text>,
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
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerRightContainerStyle: {
            paddingRight: Platform.OS === "ios" ? 12 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Videos</Text>,
          cardStyleInterpolator:
            Platform.OS === "ios"
              ? CardStyleInterpolators.forVerticalIOS
              : CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
      <AppStack.Screen
        name="Camera"
        component={CameraScreen}
        navigation={props.navigation}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            Platform.OS === "ios"
              ? CardStyleInterpolators.forVerticalIOS
              : CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
      <AppStack.Screen
        name="Preview"
        component={PreviewScreen}
        navigation={props.navigation}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerRightContainerStyle: {
            paddingRight: Platform.OS === "ios" ? 12 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Preview</Text>,
        }}
      />
      <AppStack.Screen
        name="UploadWord"
        component={UploadWordScreen}
        navigation={props.navigation}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 6 : 0,
          },
          headerRightContainerStyle: {
            paddingRight: Platform.OS === "ios" ? 6 : 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.text.black,
          headerTitle: () => <Text variant="navbar_title">Upload</Text>,
        }}
      />
      <AppStack.Screen
        name="ResultsSearch"
        component={ResultsSearchScreen}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
