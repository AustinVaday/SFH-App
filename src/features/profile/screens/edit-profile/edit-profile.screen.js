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
          {currentUser.identify ? (
            <Text variant="editprofile_label">{currentUser.identify}</Text>
          ) : (
            <Text variant="editprofile_empty_label">Add an identify</Text>
          )}
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
          {currentUser.languages.length !== 0 ? (
            <Text variant="editprofile_label">{currentUser.languages[0]}</Text>
          ) : (
            <Text variant="editprofile_empty_label">Add a language</Text>
          )}
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
          {currentUser.bio ? (
            <Text variant="editprofile_label">...</Text>
          ) : (
            <Text variant="editprofile_empty_label">Add a bio</Text>
          )}
          <ListItem.Chevron />
        </ListItem>
      </ScrollView>
    </EditProfileBackground>
  );
};
