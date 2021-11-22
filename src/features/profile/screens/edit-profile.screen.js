import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { AvatarImageEdit } from "../components/avatar-image-edit.components";

import { saveUserField } from "../../../services/user";

import {
  EditProfileBackground,
  ArrowDownIcon,
} from "../styles/edit-profile.styles";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: colors.text.black,
    paddingRight: 40,
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: colors.text.black,
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
    color: colors.text.gray,
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
        <ListItem
          onPress={() =>
            navigation.navigate("NameEdit", {
              field: "displayName",
              name: currentUser.displayName,
            })
          }
        >
          <ListItem.Content>
            <Text variant="editprofile_label">Name</Text>
          </ListItem.Content>
          <Text variant="editprofile_label">{currentUser.displayName}</Text>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() =>
            navigation.navigate("NameEdit", {
              field: "displayName",
              name: currentUser.displayName,
            })
          }
        >
          <ListItem.Content>
            <Text variant="editprofile_label">Identity</Text>
          </ListItem.Content>
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
              return <ArrowDownIcon />;
            }}
          />
        </ListItem>
        <ListItem
          onPress={() =>
            navigation.navigate("BioEdit", {
              field: "bio",
              bio: currentUser.bio,
            })
          }
        >
          <ListItem.Content>
            <Text variant="editprofile_label">Bio</Text>
          </ListItem.Content>
          <Text variant="editprofile_label">
            {currentUser.bio !== "" ? "..." : "Add a bio"}
          </Text>
          <ListItem.Chevron />
        </ListItem>
      </ScrollView>
    </EditProfileBackground>
  );
};
