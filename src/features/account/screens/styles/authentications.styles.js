import styled from "styled-components/native";
import { Button, Image } from "react-native-elements";
import { SafeArea } from "../../../../components/utilities/safe-area.components";

export const AuthenticationsBackground = styled(SafeArea)`
  justify-content: center;
`;

export const Logo = styled(Image)`
  width: 150px;
  height: 150px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
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
