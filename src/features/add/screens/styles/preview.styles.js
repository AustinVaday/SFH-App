import styled from "styled-components/native";
import { Header, Button } from "react-native-elements";
import { Video } from "expo-av";

export const PreviewBackground = styled.View`
  flex: 1;
`;

export const VideoPreview = styled(Video).attrs({
  resizeMode: "cover",
})`
  flex: 1;
`;

export const NavBar = styled(Header).attrs((props) => ({
  leftComponent: {
    icon: "arrow-back-ios",
    type: "material-icon",
    color: props.theme.colors.icon.black,
    onPress: () => props.nav.goBack(),
  },
  centerContainerStyle: {
    alignSelf: "center",
  },
  leftContainerStyle: {
    alignSelf: "center",
  },
  rightContainerStyle: {
    alignSelf: "center",
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
  },
}))``;

export const NextButton = styled(Button).attrs((props) => ({
  type: "solid",
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
