import styled from "styled-components/native";
import { Image } from "react-native";
import { Button } from "react-native-elements";

export const IntroductionBackground = styled.View`
  flex: 1;
`;

export const SlideContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const SlideImage = styled(Image)`
  width: 320px;
  height: 320px;
`;

export const NextButtonContainer = styled.View`
  width: 80%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.bg.primary};
  justify-content: center;
  align-self: center;
`;

export const DoneButtonContainer = styled.View`
  width: 80%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 5px;
  justify-content: center;
  align-self: center;
`;

export const BottomButtonsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  justify-content: center;
  flex-direction: row;
`;

export const LoginButton = styled(Button).attrs({
  type: "clear",
  containerStyle: {
    paddingRight: 15,
  },
})``;

export const SignUpButton = styled(Button).attrs({
  type: "clear",
  containerStyle: {
    paddingLeft: 15,
  },
})``;
