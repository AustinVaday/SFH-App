import styled from "styled-components";
import { Input } from "react-native-elements";

export const UsernameEditBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const UsernameTextInput = styled(Input).attrs((props) => ({
  errorStyle: {
    color: props.theme.colors.text.gray,
  },
}))`
  height: 50px;
  background-color: ${(props) => props.theme.colors.input.secondary};
`;
