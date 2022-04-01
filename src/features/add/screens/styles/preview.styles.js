import styled from "styled-components/native";
import { Platform } from "react-native";
import { Button } from "react-native-elements";
import { Video } from "expo-av";

export const PreviewBackground = styled.View`
  flex: 1;
`;

export const VideoPreview = styled(Video).attrs({
  resizeMode: "cover",
})`
  flex: 1;
`;

export const NextButton = styled(Button).attrs((props) => ({
  type: "solid",
  containerStyle: {
    paddingRight: Platform.OS === "android" ? 12 : 0,
  },
  buttonStyle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: props.theme.colors.button.primary,
  },
  titleStyle: {
    fontWeight: "600",
    color: props.theme.colors.text.secondary,
    fontSize: 14,
  },
}))``;
