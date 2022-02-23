import React from "react";
import { StatusBar } from "expo-status-bar";

import { Text } from "../../../components/typography/text.components";

import {
  NavBar,
  PreviewBackground,
  VideoPreview,
  NextButton
} from "./styles/preview.styles";

export const PreviewScreen = ({ navigation, route }) => {
  const { source, sourceThumb } = route.params;

  const approveVideo = () => {
    navigation.navigate("UploadPost", { source, sourceThumb });
  };

  return (
    <PreviewBackground>
      <NavBar
        nav={navigation}
        rightComponent={
          <NextButton
            title="Next"
            onPress={approveVideo}
          />
        }
        centerComponent={<Text variant="navbar_title">Preview</Text>}
      />
      <VideoPreview source={{ uri: source }} shouldPlay isLooping useNativeControls />
      <StatusBar style="auto" />
    </PreviewBackground>
  );
};
