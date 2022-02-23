import styled from "styled-components/native";
import { Animated } from "react-native";
import { Button } from "react-native-elements";

const { Text: AnimatedText } = Animated;

export const ConfirmationCodeBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: 25px;
`;

export const ResendButton = styled(Button).attrs({
  type: "clear",
  buttonStyle: {
    paddingLeft: 0,
  },
})``;

export const ResendButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CodeText = styled(AnimatedText)`
  margin-left: 2px;
  margin-right: 2px;
  height: 40px;
  width: 40px;
  line-height: 35px;
  font-size: 25px;
  text-align: center;
  border-radius: 28px;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
