import styled from "styled-components/native";
import { Button, Input, Icon, Image } from "react-native-elements";
import { Video } from "expo-av";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";

export const UploadWordBackground = styled.View`
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

export const FullPreviewVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  flex: 1;
`;

export const PreviewThumbnail = styled(Image)`
  width: ${Dimensions.get("window").width / 3}px;
  height: ${Dimensions.get("window").width / 2}px;
`;

export const TitleInput = styled(Input).attrs((props) => ({
  placeholderTextColor: props.theme.colors.text.lightgray,
  inputContainerStyle: { borderBottomColor: props.theme.colors.text.lightgray },
  maxLength: 30,
  multiline: true,
}))`
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export const DescriptionInput = styled(Input).attrs((props) => ({
  placeholderTextColor: props.theme.colors.text.lightgray,
  inputContainerStyle: { borderBottomColor: props.theme.colors.text.lightgray },
  maxLength: 100,
  multiline: true,
}))`
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export const UploadButton = styled(Button).attrs((props) => ({
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: props.theme.colors.button.primary,
    width: "90%",
    height: 50,
    alignSelf: "center",
  },
  containerStyle: { paddingBottom: 10 },
}))``;

export const ModalScreen = styled(Modal)`
  flex: 1;
  margin: 0;
  background-color: ${(props) => props.theme.colors.bg.black};
`;

export const BackIconContainer = styled.View`
  position: absolute;
  left: 10px;
`;

export const BackIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "ios-chevron-back",
  type: "ionicon",
  color: props.theme.colors.icon.secondary,
}))``;
