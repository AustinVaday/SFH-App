import React, { useState } from "react";
import { ScrollView, Linking, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { openURL } from "expo-linking";
import Toast from "react-native-toast-message";

import { firebase } from "../../../../utils/firebase";
import { useSelector } from "react-redux";

import { Text } from "../../../../components/typography/text.components";
import AlertDialog from "../../../../components/dialog/alert-dialog.components";
import InfoDialog from "../../../../components/dialog/info-dialog.components";
import useLoader from "../../../../services/hooks/loader/useLoader";

import {
  SettingsBackground,
  VersionSection,
  ListItemHeader,
  ListItemIcon,
  AlertIcon,
  GoogleIcon,
  FacebookIcon,
} from "./styles/settings.styles";

export const SettingsScreen = ({ navigation }) => {
  firebase.auth().currentUser?.reload();

  const currentUser = useSelector((state) => state.user.currentUser);
  const notificationEnabled = useSelector(
    (state) => state.notifications.notificationEnabled
  );

  const emailVerified = firebase.auth().currentUser?.emailVerified;
  const emailCensored = currentUser.email?.replace(
    /(\w{2})[\w.-](\w{1})+@([\w.]+\w)/,
    "$1***$2@$3"
  );

  const [loader, showLoader, hideLoader] = useLoader();

  const [visible, setVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const cancelLogoutDialog = () => setVisible(false);
  const cancelEmailDialog = () => setEmailVisible(false);
  const cancelChangePasswordDialog = () => setChangePasswordVisible(false);
  const cancelNotificationsDialog = () => setNotificationsVisible(false);

  const onHandleNotifications = () => {
    cancelNotificationsDialog();

    Platform.OS === "ios" ? openURL("app-settings:") : Linking.openSettings();
  };

  const onLogout = async () => {
    cancelLogoutDialog();

    showLoader();

    await firebase
      .auth()
      .signOut()
      .then(() => hideLoader())
      .catch(() => {
        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to log out. Try again.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  };

  const onSendVerification = () => {
    cancelEmailDialog();
    showLoader();

    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        hideLoader();

        Toast.show({
          type: "infoSuccess",
          props: {
            message: "Email verification was successfully sent.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      })
      .catch(() => {
        hideLoader();

        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to send email verification. Try again later.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  };

  const onChangeEmail = () => {
    cancelEmailDialog();

    navigation.navigate("ConfirmationCode", {
      email: currentUser.email,
      emailCensored,
      codeType: "ChangeEmail",
      routeName: "ChangeEmail",
    });
  };

  const onChangePassword = () => {
    cancelChangePasswordDialog();

    navigation.navigate("ConfirmationCode", {
      email: currentUser.email,
      emailCensored,
      codeType: "ChangePassword",
      routeName: "CurrentPassword",
    });
  };

  const toggleLogoutDialog = () => {
    setVisible(!visible);
  };
  const toggleEmailDialog = () => {
    setEmailVisible(!emailVisible);
  };
  const togglePasswordDialog = () => {
    setChangePasswordVisible(!changePasswordVisible);
  };
  const toggleNotificationsDialog = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <SettingsBackground>
      {loader}
      <ScrollView>
        {/* ACCOUNT */}
        <ListItemHeader>
          <Text variant="setting_title">Account</Text>
        </ListItemHeader>
        {currentUser.email ? (
          <>
            <ListItem onPress={toggleEmailDialog}>
              <ListItemIcon name="email-outline" />
              <ListItem.Content>
                <Text variant="setting_button">Email</Text>
              </ListItem.Content>
              {!emailVerified && emailCensored && <AlertIcon />}
              <Text variant="setting_button">{emailCensored}</Text>
              <ListItem.Chevron />
            </ListItem>
            <ListItem onPress={togglePasswordDialog}>
              <ListItemIcon name="lock-outline" />
              <ListItem.Content>
                <Text variant="setting_button">Password</Text>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </>
        ) : (
          <ListItem>
            <ListItemIcon name="cellphone" />
            <ListItem.Content>
              <Text variant="setting_button">Federated</Text>
            </ListItem.Content>
            {currentUser.providerId === "google" ? (
              <GoogleIcon />
            ) : (
              <FacebookIcon />
            )}
          </ListItem>
        )}

        {/* Dialog from email */}
        <InfoDialog
          displayAlert={emailVisible}
          title={
            emailVerified
              ? "Your email: " + emailCensored
              : "Verify your email:\n" + emailCensored
          }
          message={
            emailVerified
              ? "Your email is linked to your account. If you need to change, you will get sent " +
                "the code to verify your email before change."
              : "Your email is linked to your account. Verify it to improve your account safety."
          }
          thirdButtonText={!emailVerified && "Send verification email"}
          onPressThird={!emailVerified && onSendVerification}
          secondButtonText={"Change email"}
          onPressSecond={onChangeEmail}
          firstButtonText={"Cancel"}
          onPressFirst={cancelEmailDialog}
          onPressBackdrop={cancelEmailDialog}
        />

        {/* Dialog from password */}
        <InfoDialog
          displayAlert={changePasswordVisible}
          title={"Do you need to change your password?"}
          message={
            "You will get sent the code to verify your email and your current password before change the new password."
          }
          secondButtonText={"Change password"}
          onPressSecond={onChangePassword}
          firstButtonText={"Cancel"}
          onPressFirst={cancelChangePasswordDialog}
          onPressBackdrop={cancelChangePasswordDialog}
        />

        {/* NOTIFICATIONS */}
        <ListItemHeader>
          <Text variant="setting_title">Notifications</Text>
        </ListItemHeader>
        <ListItem onPress={toggleNotificationsDialog}>
          <ListItemIcon name="bell-outline" />
          <ListItem.Content>
            <Text variant="setting_button">Push Notifications</Text>
          </ListItem.Content>
          <Text variant="setting_button">
            {notificationEnabled ? "On" : "Off"}
          </Text>
          <ListItem.Chevron />
        </ListItem>

        {/* Dialog from notifications */}
        <InfoDialog
          displayAlert={notificationsVisible}
          title={"Push Notifications Settings"}
          message={"Need to change the push noifications?"}
          secondButtonText={"Go to Settings"}
          onPressSecond={onHandleNotifications}
          firstButtonText={"Cancel"}
          onPressFirst={cancelNotificationsDialog}
          onPressBackdrop={cancelNotificationsDialog}
        />

        {/* ABOUT */}
        <ListItemHeader>
          <Text variant="setting_title">About</Text>
        </ListItemHeader>
        <ListItem onPress={() => console.log("open terms of service")}>
          <ListItemIcon name="book-open-outline" />
          <ListItem.Content>
            <Text variant="setting_button">Terms of Service</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {/* LOGIN */}
        <ListItemHeader>
          <Text variant="setting_title">Login</Text>
        </ListItemHeader>
        <ListItem onPress={toggleLogoutDialog}>
          <ListItemIcon name="logout" />
          <ListItem.Content>
            <Text variant="setting_button">Log out</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {/* Dialog from logout */}
        <AlertDialog
          displayAlert={visible}
          title={"Log out as " + currentUser.username}
          positiveButtonText={"Logout"}
          negativeButtonText={"Cancel"}
          onPressPositive={onLogout}
          onPressNegative={cancelLogoutDialog}
        />

        {/* Versions Label */}
        <VersionSection>
          <Text variant="settings_version">Version 1.0.0</Text>
        </VersionSection>
      </ScrollView>
    </SettingsBackground>
  );
};
