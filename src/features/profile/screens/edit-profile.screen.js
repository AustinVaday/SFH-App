import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { AvatarImageEdit } from "../components/avatar-image-edit.components";

import { saveUserField } from "../../../services/user";

import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const EditProfileBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ListItem = styled(List.Item)`
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

const PickerSelectContainer = styled.View`
  padding-right: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: colors.text.primary,
    paddingRight: 40,
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: colors.text.primary,
    paddingRight: 40,
  },
});

const identifies = [
  {
    label: "Deaf",
    value: "Deaf",
  },
  {
    label: "Hard of Hearing",
    value: "Hard of Hearing",
  },
  {
    label: "Hearing",
    value: "Hearing",
  },
];

export const EditProfileScreen = ({ navigation, route }) => {
  const { currentUser } = route.params;
  const [selectedIdentify, setSelectedIdentify] = useState(
    currentUser.identify
  );

  const placeholder = {
    label: "No identify",
    value: "none",
    color: "#9EA0A4",
  };

  const onSave = () => {
    if (currentUser.identify !== selectedIdentify) {
      let field = "identify";
      saveUserField(field, selectedIdentify);
    }
  };

  return (
    <EditProfileBackground>
      <ScrollView>
        <AvatarImageEdit userImage={currentUser.profilePhoto} />
        <List.Section>
          <ListItem
            onPress={() =>
              navigation.navigate("NameEdit", {
                field: "displayName",
                name: currentUser.displayName,
              })
            }
            title={<Text variant="setting_button">Name</Text>}
            right={() => (
              <>
                <Text variant="setting_button" style={{ alignSelf: "center" }}>
                  {currentUser.displayName}
                </Text>
                <List.Icon icon="chevron-right" color={colors.text.secondary} />
              </>
            )}
          />
          <ListItem
            onPress={() =>
              navigation.navigate("UsernameEdit", {
                field: "username",
                username: currentUser.username,
              })
            }
            title={<Text variant="setting_button">Username</Text>}
            right={() => (
              <>
                <Text variant="setting_button" style={{ alignSelf: "center" }}>
                  {currentUser.username}
                </Text>
                <List.Icon icon="chevron-right" color={colors.text.secondary} />
              </>
            )}
          />
          <ListItem
            title={<Text variant="setting_button">Identity</Text>}
            right={() => (
              <PickerSelectContainer>
                <RNPickerSelect
                  placeholder={placeholder}
                  items={identifies}
                  onValueChange={(value) => {
                    setSelectedIdentify(value);
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 6,
                      right: 10,
                    },
                  }}
                  onClose={() => onSave()}
                  value={selectedIdentify}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return (
                      <Ionicons name="md-arrow-down" size={20} color="gray" />
                    );
                  }}
                />
              </PickerSelectContainer>
            )}
          />
          <ListItem
            onPress={() =>
              navigation.navigate("BioEdit", {
                field: "bio",
                bio: currentUser.bio,
              })
            }
            title={<Text variant="setting_button">Bio</Text>}
            right={() => (
              <>
                <Text
                  numberOfLines={1}
                  variant="setting_button"
                  style={{ alignSelf: "center" }}
                >
                  {currentUser.bio !== "" ? "..." : "Add a bio"}
                </Text>
                <List.Icon icon="chevron-right" color={colors.text.secondary} />
              </>
            )}
          />
        </List.Section>
      </ScrollView>
    </EditProfileBackground>
  );
};
