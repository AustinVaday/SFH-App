import styled from "styled-components/native";
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

export const EmailSentBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const LoginButton = styled(Button).attrs((props) => ({
  containerStyle: { width: "80%" },
  buttonStyle: { height: 50 },
  ViewComponent: LinearGradient,
  linearGradientProps: {
    colors: [props.theme.colors.button.primary, props.theme.colors.button.sky],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.8 },
  },
}))``;

export const CheckedIcon = styled(Icon).attrs((props) => ({
  type: "ionicon",
  name: "checkmark-circle",
  color: props.theme.colors.icon.success,
  size: 150,
}))``;
