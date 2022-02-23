import styled from "styled-components/native";
import { Pressable } from "react-native";
import { Icon, Button, Header, Image, CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import { Video } from "expo-av";

export const LibraryBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const VideoImage = styled(Image)`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.button.foggedglass : "transparent"};
`;

export const ImagePressable = styled(Pressable)`
  margin-bottom: 2px;
  margin-right: ${(props) => (props.index % 3 === 2 ? 0 : 2)}px;
`;

export const DurationTextContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const CheckCircleContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;

export const CheckCircle = styled(CheckBox).attrs((props) => ({
  iconType: "material-community",
  checked: props.isSelected ? true : false,
  checkedIcon: "checkbox-marked-circle",
  checkedColor: props.theme.colors.icon.primary,
  uncheckedIcon: "checkbox-blank-circle-outline",
  uncheckedColor: props.theme.colors.icon.secondary,
  size: 25,
  containerStyle: {
    padding: 0,
    margin: 5,
    marginLeft: 0,
    marginRight: 5,
    backgroundColor: props.isSelected
      ? props.theme.colors.bg.secondary
      : "transparent",
    borderRadius: props.isSelected ? 25 : 0,
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
  disabled: props.selected ? false : true,
}))``;

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
    type: "ionicons",
    color: props.theme.colors.icon.black,
    onPress: () => props.nav.goBack(),
  },
  leftContainerStyle: { justifyContent: "center" },
  centerContainerStyle: { justifyContent: "center" },
  rightContainerStyle: { justifyContent: "center" },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
  },
  barStyle: "light-content",
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

export const ListEmptyBackground = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListEmptyContainer = styled.View`
  padding-top: 25%;
`;

export const VideosEmptyImage = styled(Image)`
  width: 300px;
  height: 250px;
`;

export const BackIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "ios-chevron-back",
  type: "ionicon",
  color: props.theme.colors.icon.secondary,
}))``;

export const ModalVideo = styled(Video)`
  flex: 1;
`;

export const ModalScreen = styled(Modal)`
  flex: 1;
  margin: 0;
  background-color: ${(props) => props.theme.colors.bg.black};
`;

export const BackIconContainer = styled.View`
  position: absolute;
  left: 10px;
`;
