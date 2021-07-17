import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Dialog, Portal, List } from "react-native-paper";
import { openURL } from "expo-linking";
import styled from "styled-components";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const SettingsBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const DialogHeader = styled.View`
  align-items: center;
`;

const VersionSection = styled.View`
  align-items: center;
`;

const DialogButton = styled(Button).attrs({
  contentStyle: {
    padding: 8,
    backgroundColor: colors.bg.primary,
    borderWidth: 0.2,
    borderColor: "lightgray",
  },
  uppercase: false,
})`
  flex: 1;
`;

const DialogButtonsContainer = styled(Dialog.Actions)`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0;
`;

const ListItem = styled(List.Item)`
  padding: 0;
`;

export const SettingsScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const { onLogout } = useContext(AuthenticationContext);

  const showLogoutDialog = () => setVisible(true);

  const hideLogoutDialog = () => setVisible(false);

  const handleNotifications = () => {
    openURL("app-settings:");
  };

  return (
    <SettingsBackground>
      <ScrollView>
        <List.Section>
          <List.Subheader style={{ paddingVertical: 6 }}>
            <Text variant="setting_title">Account</Text>
          </List.Subheader>
          <ListItem
            onPress={() => {}}
            title={<Text variant="setting_button">Change Email</Text>}
            left={() => (
              <List.Icon icon="email-outline" color={colors.text.secondary} />
            )}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
          />
          <ListItem
            onPress={() => {}}
            title={<Text variant="setting_button">Change Password</Text>}
            left={() => (
              <List.Icon color={colors.text.secondary} icon="lock-outline" />
            )}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
          />

          <List.Subheader style={{ paddingVertical: 6 }}>
            <Text variant="setting_title">Notifications</Text>
          </List.Subheader>
          <ListItem
            onPress={handleNotifications}
            title={<Text variant="setting_button">Push Notifications</Text>}
            left={() => (
              <List.Icon icon="bell-outline" color={colors.text.secondary} />
            )}
            right={() => (
              <>
                <Text
                  variant="setting_button"
                  style={{ alignSelf: "center", color: colors.text.secondary }}
                >
                  Off
                </Text>
                <List.Icon icon="chevron-right" color={colors.text.secondary} />
              </>
            )}
          />

          <List.Subheader style={{ paddingVertical: 6 }}>
            <Text variant="setting_title">About</Text>
          </List.Subheader>
          <ListItem
            onPress={() => {}}
            title={<Text variant="setting_button">Terms of Service</Text>}
            left={() => (
              <List.Icon
                icon="book-open-outline"
                color={colors.text.secondary}
              />
            )}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
          />

          <List.Subheader style={{ paddingVertical: 6 }}>
            <Text variant="setting_title">Login</Text>
          </List.Subheader>
          <ListItem
            onPress={showLogoutDialog}
            title={<Text variant="setting_button">Log out</Text>}
            left={() => (
              <List.Icon icon="logout" color={colors.text.secondary} />
            )}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
          />
          <Portal>
            <Dialog
              visible={visible}
              dismissable={false}
              onDismiss={hideLogoutDialog}
            >
              <DialogHeader>
                <Dialog.Title>
                  <Text variant="setting_title">Are you sure to log out?</Text>
                </Dialog.Title>
                <Dialog.Content>
                  <Text>Shane Wilson</Text>
                </Dialog.Content>
              </DialogHeader>
              <DialogButtonsContainer>
                <DialogButton
                  labelStyle={{
                    color: colors.brand.primary,
                  }}
                  onPress={hideLogoutDialog}
                >
                  Cancel
                </DialogButton>
                <DialogButton
                  labelStyle={{
                    color: colors.brand.primary,
                    fontFamily: "OpenSans_800ExtraBold",
                  }}
                  onPress={onLogout}
                >
                  Confirm
                </DialogButton>
              </DialogButtonsContainer>
            </Dialog>
          </Portal>
        </List.Section>

        <VersionSection>
          <Text
            style={{ color: colors.text.secondary }}
            variant="setting_button"
          >
            Version 1.0.0
          </Text>
        </VersionSection>
      </ScrollView>
    </SettingsBackground>
  );
};
