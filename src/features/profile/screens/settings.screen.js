import React, { useState } from "react";
import { ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { openURL } from "expo-linking";

import { firebase } from "../../../utils/firebase";

import { Text } from "../../../components/typography/text.components";

import {
  SettingsBackground,
  VersionSection,
  DialogButton,
  Dialog,
  DialogButtonsContainer,
  ListItemHeader,
  ListItemIcon,
} from "../styles/settings.styles";

export const SettingsScreen = () => {
  const [visible, setVisible] = useState(false);

  const cancelDialog = () => setVisible(false);

  const handleNotifications = () => {
    openURL("app-settings:");
  };

  const onLogout = async () => {
    firebase.auth().signOut();
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <SettingsBackground>
      <ScrollView>
        {/* ACCOUNT */}
        <ListItemHeader>
          <Text variant="setting_title">Account</Text>
        </ListItemHeader>
        <ListItem onPress={() => console.log("change email")}>
          <ListItemIcon name="email-outline" />
          <ListItem.Content>
            <Text variant="setting_button">Change Email</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={() => console.log("change password")}>
          <ListItemIcon name="lock-outline" />
          <ListItem.Content>
            <Text variant="setting_button">Change Password</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {/* NOTIFICATIONS */}
        <ListItemHeader>
          <Text variant="setting_title">Notifications</Text>
        </ListItemHeader>
        <ListItem onPress={handleNotifications}>
          <ListItemIcon name="bell-outline" />
          <ListItem.Content>
            <Text variant="setting_button">Push Notifications</Text>
          </ListItem.Content>
          <Text variant="setting_button">Off</Text>
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
        <ListItem onPress={toggleDialog}>
          <ListItemIcon name="logout" />
          <ListItem.Content>
            <Text variant="setting_button">Log out</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {/* Dialog from logout */}
        <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
          <Text variant="settings_dialog_title">Log out as shane90?</Text>
          <DialogButtonsContainer>
            <DialogButton
              title={<Text variant="settings_dialog_cancel">Cancel</Text>}
              onPress={cancelDialog}
            />
            <DialogButton
              title={<Text variant="settings_dialog_logout">Logout</Text>}
              onPress={() => {
                onLogout();
              }}
            />
          </DialogButtonsContainer>
        </Dialog>

        {/* Versions Label */}
        <VersionSection>
          <Text variant="settings_version">Version 1.0.0</Text>
        </VersionSection>
      </ScrollView>
    </SettingsBackground>
  );
};
