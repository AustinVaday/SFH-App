import styled from "styled-components";
import { Input } from "react-native-elements";

export const BioEditBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const BioTextInput = styled(Input).attrs((props) => ({
  errorStyle: {
    color: props.theme.colors.text.gray,
  },
}))`
  min-height: 120px;
  background-color: ${(props) => props.theme.colors.input.secondary};
  flex: 1;
`;
