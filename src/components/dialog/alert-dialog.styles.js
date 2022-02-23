import styled from "styled-components";
import { Pressable } from "react-native";
import { Overlay } from "react-native-elements";

export const DialogButton = styled(Pressable)`
  border-top-width: 0.5px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-color: ${(props) => props.theme.colors.button.lightgray};
  align-items: center;
  width: 50%;
  padding: 12px;
`;

export const TextsContainer = styled.View`
  padding: 30px;
`;

export const DialogButtonsSlash = styled.View`
  border-width: 0.5px;
  border-color: ${(props) => props.theme.colors.button.lightgray};
`;

export const Dialog = styled(Overlay).attrs({
  overlayStyle: { width: "80%", padding: 0 },
})``;

export const DialogButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0;
  flex-grow: 1;
`;
