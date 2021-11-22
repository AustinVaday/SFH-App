import styled from "styled-components";
import { ImageBackground, ActivityIndicator, Dimensions } from "react-native";

export const LoadingBackground = styled.View`
  flex: 1;
`;

export const LogoSplash = styled(ImageBackground).attrs({
  resizeMode: "center",
})`
  flex: 1;
`;

export const LoadingIcon = styled(ActivityIndicator).attrs((props) => ({
  size: "large",
  color: props.theme.colors.icon.primary,
}))`
  flex: 1;
  top: ${Dimensions.get("window").height * 0.1}px;
`;
