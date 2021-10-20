import React from "react";
import { View, Alert, TouchableWithoutFeedback } from "react-native";
import { Avatar, Surface } from "react-native-paper";
import { openURL } from "expo-linking";
import styled from "styled-components";

import { colors } from "../../../infrastructure/theme/colors";

import { saveUserProfileImage } from "../../../services/user";

import { useActionSheet } from "@expo/react-native-action-sheet";

import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";

const CameraEditIcon = styled(Avatar.Icon).attrs({
  theme: { colors: { primary: colors.brand.primary } },
  size: 30,
})`
  position: absolute;
  align-self: flex-end;
`;

export const AvatarImageEdit = ({ userImage }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const takePhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== "granted") {
      alertNeedPermissions("camera");
    } else {
      let result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        saveUserProfileImage(result.uri);
      }
    }
  };

  const uploadPhoto = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alertNeedPermissions("photos");
    } else {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        saveUserProfileImage(result.uri);
      }
    }
  };

  const alertNeedPermissions = (title) => {
    Alert.alert(
      "Couldn't access " + title,
      "Please go to Settings > Privacy and grant the permissions.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open settings",
          onPress: () => openURL("app-settings:"),
        },
      ]
    );
  };

  const onPhotoActions = () =>
    showActionSheetWithOptions(
      {
        options: ["Cancel", "Take photo", "Upload photo"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          takePhoto();
        } else if (buttonIndex === 2) {
          uploadPhoto();
        }
      }
    );

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <TouchableWithoutFeedback onPress={onPhotoActions}>
        <Surface style={{ borderRadius: 60, elevation: 1 }}>
          <Avatar.Image
            size={120}
            source={{
              uri: userImage,
            }}
          />
          <CameraEditIcon icon="camera" />
        </Surface>
      </TouchableWithoutFeedback>
    </View>
  );
};
