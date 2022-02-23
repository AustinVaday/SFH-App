import styled from "styled-components/native";
import { ScrollView, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../../../../../components/typography/text.components";

export const LoginBackground = styled(ScrollView).attrs({
  scrollEnabled: false,
  keyboardShouldPersistTaps: "always",
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ForgotPasswordButton = styled(Button).attrs({
  type: "clear",
  containerStyle: { alignSelf: "flex-end" },
})``;

export const LoginText = styled(Text).attrs({
  variant: "login_button",
})`
  color: ${(props) =>
    props.enableButton
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.darkgray};
`;

export const ClearIcon = styled(Icon).attrs((props) => ({
  type: "material-community",
  name: "close-circle",
  size: 20,
  color: props.theme.colors.icon.gray,
}))``;

export const SeeIcon = styled(Icon).attrs((props) => ({
  type: "material-community",
  name: props.hidePassword ? "eye-off" : "eye",
  size: 20,
  color: props.theme.colors.icon.gray,
}))``;

export const RightIconsInputContainer = styled.View`
  flex-direction: row;
  padding-left: ${(props) => props.theme.space[2]};
`;

export const LoginButton = styled(Button).attrs((props) => ({
  disabled: props.enableButton ? false : true,
  disabledStyle: { backgroundColor: props.theme.colors.button.lightergray },
  buttonStyle: { height: 45 },
  ViewComponent: props.enableButton ? LinearGradient : View,
  linearGradientProps: props.enableButton
    ? {
        colors: [
          props.theme.colors.button.primary,
          props.theme.colors.button.sky,
        ],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.8 },
      }
    : {},
}))``;

export const FormSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

export const EmailInput = styled(Input).attrs((props) => ({
  inputContainerStyle: {
    borderBottomColor: props.theme.colors.text.primary,
  },
  labelStyle: {
    fontSize: 12,
    color: props.theme.colors.text.primary,
  },
  inputStyle: { fontSize: 15 },
  leftIcon: {
    type: "material-community",
    name: "email",
    size: 24,
    color: props.theme.colors.text.primary,
  },
  renderErrorMessage: false,
  placeholderTextColor: props.theme.colors.icon.gray,
}))``;

export const PasswordInput = styled(Input).attrs((props) => ({
  inputContainerStyle: {
    borderBottomColor: props.theme.colors.text.primary,
  },
  labelStyle: {
    fontSize: 12,
    color: props.theme.colors.text.primary,
  },
  inputStyle: { fontSize: 15 },
  leftIcon: {
    type: "material-community",
    name: "lock",
    size: 24,
    color: props.theme.colors.text.primary,
  },
  renderErrorMessage: false,
  placeholderTextColor: props.theme.colors.icon.gray,
}))``;
