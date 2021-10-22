import React from "react";
import { Video } from "expo-av";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

import { useNavigation } from '@react-navigation/native'

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

const PreviewTopButtonsSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PreviewScreen = (props) => {
  const navigation = useNavigation();

  const { source, sourceThumb } = props.route.params;

  const approveVideo = async () => {
    navigation.navigate("Post", { source, sourceThumb });
  };

  return (
    <SafeArea>
      <PreviewTopButtonsSection>
        <IconButton size={35} icon="close" onPress={() => navigation.goBack()} />
        <Text variant="title">Preview</Text>
        <IconButton
          size={35}
          icon="checkbox-marked"
          color={colors.brand.primary}
          onPress={approveVideo}
        />
      </PreviewTopButtonsSection>
      <Video
        source={{ uri: props.route.params.source }}
        resizeMode="cover"
        isLooping
        useNativeControls
        style={{ flex: 1 }}
      />
    </SafeArea>
  );
};
