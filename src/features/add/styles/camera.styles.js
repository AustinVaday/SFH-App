import styled from "styled-components/native";
import { Icon, Button } from "react-native-elements";
import { Camera } from "expo-camera";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import LottieView from "lottie-react-native";

export const CameraBackground = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const CameraSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

export const TopButtonsSection = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  flex-direction: row;
`;

export const CameraControlButtonsContainer = styled.View`
  flex: 1;
  padding-top: ${(props) => props.theme.space[2]};
  align-items: flex-end;
`;

export const BottomButtonsSection = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const BottomButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const Spacer = styled.View`
  padding: 22px;
`;

export const AnimationWrapper = styled.View`
  flex-direction: row;
  height: 10px;
  width: 90%;
  background-color: rgba(96, 96, 96, 0.5);
  border-radius: 5px;
  align-self: center;
`;

export const RecordIcon = styled(LottieView).attrs({
  resizeMode: "cover",
})`
  width: 35%;
`;

export const AllowCameraAccessSection = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
  padding: ${(props) => props.theme.space[3]};
`;

export const EnablePermissionsButton = styled(Button).attrs((props) => ({
  type: "clear",
  color: props.theme.colors.text.primary,
}))``;

export const CloseIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name: "close",
  type: "material-community",
  color: props.isPermissions
    ? props.theme.colors.icon.black
    : props.theme.colors.icon.secondary,
}))`
  align-items: ${(props) => (props.isPermissions ? "flex-start" : "center")};
  padding-left: ${(props) => (props.isPermissions ? 8 : 0)}px;
`;

export const FrontOrRearIcon = styled(Icon).attrs((props) => ({
  size: 35,
  name:
    props.cameraType === Camera.Constants.Type.back
      ? "camera-front"
      : "camera-rear",
  type: "material-community",
  color: props.theme.colors.icon.secondary,
}))`
  padding-bottom: ${(props) => props.theme.space[3]};
`;

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
