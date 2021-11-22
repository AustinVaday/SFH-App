import styled from "styled-components/native";
import { Header, Button, Input } from "react-native-elements";
import { Video } from "expo-av";
import { ActivityIndicator, Dimensions } from "react-native";

export const UploadPostBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const InputsContainer = styled.View`
  flex: 1;
  padding-top: 40px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const VideoContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
`;

export const UploadingBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FullPreviewVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height / 1.5}px;
`;

export const PreviewVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  width: ${Dimensions.get("window").width / 3}px;
  height: ${Dimensions.get("window").width / 2}px;
`;

export const LoadingIndicator = styled(ActivityIndicator).attrs((props) => ({
    color: props.theme.colors.ui.primary,
    size: "large",
  }))``;

export const NavBar = styled(Header).attrs((props) => ({
  leftComponent: {
    size: 35,
    icon: "chevron-left",
    type: "feather",
    color: props.theme.colors.icon.black,
    onPress: () => props.nav.goBack(),
  },
  leftContainerStyle: {
    alignSelf: "center",
  },
  centerContainerStyle: {
    alignSelf: "center",
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
    paddingVertical: 4,
  },
}))``;

export const TitleInput = styled(Input).attrs((props) => ({
  placeholderTextColor: props.theme.colors.text.lightgray,
  inputContainerStyle: { borderBottomColor: props.theme.colors.text.lightgray },
  maxLength: 30,
  multiline: true,
}))``;

export const DescriptionInput = styled(Input).attrs((props) => ({
  placeholderTextColor: props.theme.colors.text.lightgray,
  inputContainerStyle: { borderBottomColor: props.theme.colors.text.lightgray },
  maxLength: 100,
  multiline: true,
}))``;

export const PostButton = styled(Button).attrs((props) => ({
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: props.theme.colors.button.primary,
    width: 150,
    alignSelf: "center",
  },
  containerStyle: { paddingBottom: 10 },
}))``;
