import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Icon, Button, Header } from "react-native-elements";
import { Video } from "expo-av";

export const SmallVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  width: ${Dimensions.get("window").width / 3}px;
  height: ${Dimensions.get("window").width / 3}px;
`;

export const PreviewVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  width: ${Dimensions.get("window").width}px;
  height: 100%;
`;

export const LibraryBackground = styled.View`
  flex: 1;
`;

export const PreviewVideoContainer = styled.View`
  flex: 1;
`;

export const AllowPhotosAccessSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const NavBar = styled(Header).attrs((props) => ({
  leftComponent: {
    size: 30,
    icon: "close",
    type: "material-community",
    color: props.theme.colors.icon.black,
    onPress: () => props.nav.goBack(),
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
  },
}))``;

export const PlayIcon = styled(Icon).attrs((props) => ({
  size: 85,
  name: props.shouldPlay ? null : "play",
  type: "material-community",
  color: props.theme.colors.icon.secondary,
  containerStyle: {
    position: "absolute",
    bottom: "40%",
    right: 0,
    left: 0,
  },
}))``;

export const CameraIcon = styled(Icon).attrs((props) => ({
  size: 25,
  name: "camera",
  type: "material-community",
  color: props.theme.colors.button.black,
  reverse: true,
  iconStyle: {
    color: props.theme.colors.icon.secondary,
    fontSize: 35,
  },
  containerStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
}))``;

export const CloseIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "close",
  type: "material-community",
  color: props.theme.colors.icon.black,
}))`
  align-items: flex-start;
  padding-left: 8px;
`;

export const EnablePermissionsButton = styled(Button).attrs((props) => ({
  type: "clear",
  color: props.theme.colors.text.primary,
}))``;
