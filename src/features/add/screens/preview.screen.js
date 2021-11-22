import React from "react";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import {
  NavBar,
  PreviewBackground,
  VideoPreview,
} from "../styles/preview.styles";

export const PreviewScreen = ({ navigation, route }) => {
  const { source, sourceThumb } = route.params;

  const approveVideo = () => {
    navigation.navigate("UploadPost", { source, sourceThumb });
  };

  return (
    <PreviewBackground>
      <NavBar
        nav={navigation}
        rightComponent={{
          size: 35,
          icon: "checkbox-marked",
          type: "material-community",
          color: colors.icon.primary,
          onPress: approveVideo,
        }}
        centerComponent={<Text variant="navbar_title">Preview</Text>}
      />
      <VideoPreview source={{ uri: source }} isLooping useNativeControls />
    </PreviewBackground>
  );
};
