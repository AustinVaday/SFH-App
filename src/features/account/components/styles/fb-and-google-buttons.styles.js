import styled from "styled-components/native";
import { Button } from "react-native-elements";

export const AuthenticationsButtonsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
`;

export const FacebookButton = styled(Button).attrs((props) => ({
  icon: {
    name: "logo-facebook",
    type: "ionicon",
    color: props.theme.colors.icon.secondary,
    size: 30,
  },
  buttonStyle: {
    backgroundColor: props.theme.colors.button.facebook,
    alignSelf: "center",
    width: "80%",
    height: 50,
  },
}))``;

export const GoogleButton = styled(Button).attrs((props) => ({
  icon: {
    name: "logo-google",
    type: "ionicon",
    color: props.theme.colors.icon.secondary,
    size: 30,
  },
  buttonStyle: {
    backgroundColor: props.theme.colors.button.google,
    alignSelf: "center",
    width: "80%",
    height: 50,
  },
}))``;
