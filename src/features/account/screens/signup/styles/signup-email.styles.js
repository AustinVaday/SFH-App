import styled from "styled-components/native";
import { ScrollView, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../../../../../components/typography/text.components";

export const SignupBackground = styled(ScrollView).attrs({
  scrollEnabled: false,
  keyboardShouldPersistTaps: "always",
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const FormSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

export const NextText = styled(Text).attrs({
  variant: "signup_button",
})`
  color: ${(props) =>
    props.enableButton
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.darkgray};
`;

export const NextButton = styled(Button).attrs((props) => ({
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

export const EmailInput = styled(Input).attrs((props) => ({
  containerStyle: { paddingHorizontal: 0 },
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
  rightIconContainerStyle: {
    paddingLeft: 8,
  },
  renderErrorMessage: false,
  placeholderTextColor: props.theme.colors.text.gray,
}))``;
