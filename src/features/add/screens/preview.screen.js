import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  PreviewBackground,
  VideoPreview,
  NextButton,
} from "./styles/preview.styles";

export const PreviewScreen = ({ navigation, route }) => {
  const { source, sourceThumb } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NextButton title="Next" onPress={approveVideo} />,
    });
  }, [navigation]);

  const approveVideo = () => {
    navigation.navigate("UploadWord", { source, sourceThumb });
  };

  return (
    <PreviewBackground>
      <VideoPreview
        source={{ uri: source }}
        shouldPlay
        isLooping
        useNativeControls
      />
      <StatusBar style="auto" />
    </PreviewBackground>
  );
};
