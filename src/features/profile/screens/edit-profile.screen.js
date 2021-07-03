import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { AvatarImageEdit } from "../components/avatar-image-edit.components";

import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

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
  const { item } = route.params;
  const [selectedIdentify, setSelectedIdentify] = useState(item.identify);

  const placeholder = {
    label: "Don't want to identify",
    value: null,
    color: "#9EA0A4",
  };

  return (
    <SafeArea>
      <ScrollView>
        <AvatarImageEdit userImage={item.avatar} />
        <List.Section>
          <ListItem
            onPress={() => navigation.navigate("NameEdit", { name: item.name })}
            title={<Text variant="setting_button">Name</Text>}
            right={() => (
              <>
                <Text variant="setting_button" style={{ alignSelf: "center" }}>
                  {item.name}
                </Text>
                <List.Icon icon="chevron-right" color={colors.text.secondary} />
              </>
            )}
          />
          <ListItem
            onPress={() =>
              navigation.navigate("UsernameEdit", { username: item.username })
            }
            title={<Text variant="setting_button">Username</Text>}
            right={() => (
              <>
                <Text variant="setting_button" style={{ alignSelf: "center" }}>
                  {item.username}
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
            onPress={() => navigation.navigate("BioEdit", { bio: item.bio })}
            title={<Text variant="setting_button">Bio</Text>}
            right={() => (
              <>
                <Text
                  numberOfLines={1}
                  variant="setting_button"
                  style={{ alignSelf: "center" }}
                >
                  {item.bio !== "" ? "..." : "Add a bio"}
                </Text>
                <List.Icon icon="chevron-right" color={colors.text.secondary} />
              </>
            )}
          />
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
