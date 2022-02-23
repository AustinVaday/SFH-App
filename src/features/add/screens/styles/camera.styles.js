import styled from "styled-components/native";
import { Icon, Button, Image } from "react-native-elements";
import { Camera } from "expo-camera";
import LottieView from "lottie-react-native";

export const CameraContainer = styled.View`
  flex: 1;
`;

export const VideoCamera = styled(Camera)`
  flex: 1;
`;

export const IconContainer = styled.View`
  flex: 1;
`;

export const NoImages = styled(Image)`
  width: 300px;
  height: 250px;
`;

export const ProgressBarContainer = styled.View`
  position: absolute;
  right: 20px;
  left: 20px;
`;

export const TopBarContainer = styled.View`
  right: 0;
  position: absolute;
  flex-direction: row;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
`;

export const CameraControlButtonsContainer = styled.View`
  flex: 1;
  padding-top: ${(props) => props.theme.space[2]};
  align-items: flex-end;
`;

export const BottomBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
`;

export const Spacer = styled.View`
  flex: 1;
`;

export const AnimationWrapper = styled.View`
  flex-direction: row;
  height: 10px;
  width: 100%;
  background-color: rgba(96, 96, 96, 0.5);
  border-radius: 5px;
  align-self: center;
`;

export const RecordIcon = styled(LottieView).attrs({
  resizeMode: "cover",
})`
  width: 100%;
  height: 100%;
`;

export const AllowCameraAccessSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  padding-bottom: 25%;
`;

export const EnablePermissionsButton = styled(Button).attrs((props) => ({
  type: "clear",
  color: props.theme.colors.text.primary,
  containerStyle: { marginTop: "20%" },
}))``;

export const CloseIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "close",
  type: "material-community",
  color: props.isPermissions
    ? props.theme.colors.icon.black
    : props.theme.colors.icon.secondary,
  containerStyle: {
    alignItems: props.isPermissions ? "flex-start" : "center",
    padding: props.isPermissions ? 10 : 0,
  },
}))``;

export const FrontOrRearIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name:
    props.cameraType === Camera.Constants.Type.back
      ? "camera-front"
      : "camera-rear",
  type: "material-community",
  color: props.theme.colors.icon.secondary,
  containerStyle: { paddingBottom: 15 },
}))``;

export const FlashOffIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "flash-off",
  type: "material-community",
  color: props.theme.colors.icon.secondary,
}))``;

export const FlashIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "flash",
  type: "material-community",
  color: props.theme.colors.icon.secondary,
}))``;

export const LibraryIcon = styled(Icon).attrs((props) => ({
  size: 45,
  name: "filmstrip-box-multiple",
  type: "material-community",
  color: props.theme.colors.icon.secondary,
}))``;
