import styled from "styled-components/native";
import { Button } from "react-native-elements";
import { SafeArea } from "../../../components/utilities/safe-area.components";

export const AuthenticationsBackground = styled(SafeArea)`
  justify-content: center;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 30%;
`;

export const TitleAndMessageSection = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-items: center;
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
