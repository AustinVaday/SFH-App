import React from "react";
import { ScrollView } from "react-native";
import { ListItem } from "react-native-elements";

import { Text } from "../../../../components/typography/text.components";
import { AvatarImageEdit } from "../../components/avatar-image-edit.components";

import { useSelector } from "react-redux";

import { EditProfileBackground } from "./styles/edit-profile.styles";

export const EditProfileScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

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
            <Text variant="editprofile_label">Display Name</Text>
          </ListItem.Content>
          <Text variant="editprofile_label">{currentUser.displayName}</Text>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() =>
            navigation.navigate("IdentifyEdit", {
              field: "identify",
              identify: currentUser.identify,
            })
          }
        >
          <ListItem.Content>
            <Text variant="editprofile_label">Identity</Text>
          </ListItem.Content>
          <Text variant="editprofile_label">{currentUser.identify}</Text>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() =>
            navigation.navigate("LanguagesEdit", {
              field: "languages",
              languages: currentUser.languages,
            })
          }
        >
          <ListItem.Content>
            <Text variant="editprofile_label">Languages</Text>
          </ListItem.Content>
          <Text variant="editprofile_label">{currentUser.languages}</Text>
          <ListItem.Chevron />
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
