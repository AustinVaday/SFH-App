import React, { useState } from "react";
import { ScrollView, Alert, Linking, Platform } from "react-native";
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
} from "./styles/settings.styles";

export const SettingsScreen = ({ navigation }) => {
  firebase.auth().currentUser?.reload();

  const currentUser = useSelector((state) => state.user.currentUser);
  const notificationEnabled = useSelector(
    (state) => state.notifications.notificationEnabled
  );

  const emailVerified = firebase.auth().currentUser?.emailVerified;
  const providerData = firebase.auth().currentUser?.providerData;
  const emailCensored = currentUser.email?.replace(
    /(\w{2})[\w.-](\w{1})+@([\w.]+\w)/,
    "$1***$2@$3"
  );

  const [loader, showLoader, hideLoader] = useLoader();

  const [visible, setVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [emptyEmailVisible, setEmptyEmailVisible] = useState(false);
  const [emptyPasswordVisible, setEmptyPasswordVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [unlinkVisible, setUnlinkVisible] = useState(false);

  const cancelLogoutDialog = () => setVisible(false);
  const cancelEmailDialog = () => setEmailVisible(false);
  const cancelEmptyEmailDialog = () => setEmptyEmailVisible(false);
  const cancelEmptyPasswordDialog = () => setEmptyPasswordVisible(false);
  const cancelChangePasswordDialog = () => setChangePasswordVisible(false);
  const cancelUnlinkDialog = () => setUnlinkVisible(false);

  const handleNotifications = () => {
    Alert.alert(
      "Notifications Settings",
      "Need to turn the noifications on or off?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go to Settings",
          onPress: () =>
            Platform.OS === "ios"
              ? openURL("app-settings:")
              : Linking.openSettings(),
        },
      ]
    );
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
          visibilityTime: 2000,
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
          visibilityTime: 2000,
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
          visibilityTime: 2000,
          topOffset: 45,
        });
      });
  };

  const onLinkEmail = () => {
    if (emptyPasswordVisible) {
      cancelEmptyPasswordDialog();
    } else {
      cancelEmptyEmailDialog();
    }
    navigation.navigate("CreateEmail");
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

  const onUnlinkEmail = () => {
    if (providerData.length <= 1) {
      cancelEmailDialog();

      Toast.show({
        type: "infoMessage",
        props: {
          message: "You can't unlink your email due to the account security.",
        },
        visibilityTime: 2000,
        topOffset: 45,
      });
    } else {
      cancelEmailDialog();

      toggleUnlinkDialog();
    }
  };

  const onUnlink = () => {
    cancelUnlinkDialog();

    navigation.navigate("ConfirmationCode", {
      email: currentUser.email,
      emailCensored,
      codeType: "Unlink",
      routeName: "",
    });
  };

  const toggleLogoutDialog = () => {
    setVisible(!visible);
  };

  const toggleEmailDialog = () => {
    if (currentUser.email) {
      setEmailVisible(!emailVisible);
    } else {
      setEmptyEmailVisible(!emptyEmailVisible);
    }
  };

  const togglePasswordDialog = () => {
    if (currentUser.email) {
      setChangePasswordVisible(!changePasswordVisible);
    } else {
      setEmptyPasswordVisible(!emptyPasswordVisible);
    }
  };

  const toggleUnlinkDialog = () => {
    setUnlinkVisible(!unlinkVisible);
  };

  return (
    <SettingsBackground>
      {loader}
      <ScrollView>
        {/* ACCOUNT */}
        <ListItemHeader>
          <Text variant="setting_title">Account</Text>
        </ListItemHeader>
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
              ? "Your email is linked to your account. If you need to change or unlink email, you will " +
                "need to verify your email before change or unlink."
              : "Your email is linked to your account. Verify it to improve your account safety."
          }
          fourthButtonText={!emailVerified && "Send verification email"}
          onPressFourth={!emailVerified && onSendVerification}
          thirdButtonText={"Change email"}
          onPressThird={onChangeEmail}
          secondButtonText={"Unlink email"}
          onPressSecond={onUnlinkEmail}
          firstButtonText={"Cancel"}
          onPressFirst={cancelEmailDialog}
          onPressBackdrop={cancelEmailDialog}
        />

        <InfoDialog
          displayAlert={emptyEmailVisible}
          title={"Do you want to link your email to your account?"}
          message={
            "You will need to create email and password then link to your account."
          }
          secondButtonText={"Link"}
          onPressSecond={onLinkEmail}
          firstButtonText={"Cancel"}
          onPressFirst={cancelEmptyEmailDialog}
          onPressBackdrop={cancelEmptyEmailDialog}
        />

        {/* Dialogs from password */}
        <InfoDialog
          displayAlert={emptyPasswordVisible}
          title={
            "You have not created the email. Do you want to link it to your account?"
          }
          message={
            "You will need to create email and password then link to your account."
          }
          secondButtonText={"Link"}
          onPressSecond={onLinkEmail}
          firstButtonText={"Cancel"}
          onPressFirst={cancelEmptyPasswordDialog}
          onPressBackdrop={cancelEmptyPasswordDialog}
        />

        <InfoDialog
          displayAlert={changePasswordVisible}
          title={"Do you want to change your password?"}
          message={
            "You will need to verify your email and your current password before change the new password."
          }
          secondButtonText={"Change password"}
          onPressSecond={onChangePassword}
          firstButtonText={"Cancel"}
          onPressFirst={cancelChangePasswordDialog}
          onPressBackdrop={cancelChangePasswordDialog}
        />

        <AlertDialog
          displayAlert={unlinkVisible}
          title={"Are you sure you want to unlink?"}
          message={
            "If you unlink your email from your account, you " +
            "will lose:\n\n\u25CF Able to login with email\n\u25CF Manage " +
            "account security with email\n\u25CF Receive the messages from SFH in email"
          }
          positiveButtonText={"Unlink"}
          negativeButtonText={"Cancel"}
          onPressPositive={onUnlink}
          onPressNegative={cancelUnlinkDialog}
        />

        {/* NOTIFICATIONS */}
        <ListItemHeader>
          <Text variant="setting_title">Notifications</Text>
        </ListItemHeader>
        <ListItem onPress={handleNotifications}>
          <ListItemIcon name="bell-outline" />
          <ListItem.Content>
            <Text variant="setting_button">Push Notifications</Text>
          </ListItem.Content>
          <Text variant="setting_button">
            {notificationEnabled ? "On" : "Off"}
          </Text>
          <ListItem.Chevron />
        </ListItem>

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
