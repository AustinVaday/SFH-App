import styled from "styled-components";
import { Overlay, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SettingsBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const VersionSection = styled.View`
  align-items: center;
`;

export const DialogButton = styled(Button).attrs({
  buttonStyle: {
    padding: 12,
  },
  containerStyle: {
    flex: 1,
  },
  type: "outline",
})``;

export const Dialog = styled(Overlay).attrs({
  overlayStyle: { width: "80%", padding: 0 },
})``;

export const DialogButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0;
  flex-grow: 1;
`;

export const ListItemHeader = styled.View`
  padding: 10px;
`;

export const ListItemIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: 20,
  color: props.theme.colors.icon.gray,
}))``;
