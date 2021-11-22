import styled from "styled-components/native";
import { Header } from "react-native-elements";
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
    size: 35,
    icon: "chevron-left",
    type: "feather",
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
    paddingVertical: 4,
  },
}))``;
