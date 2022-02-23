import styled from "styled-components";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export const SettingsBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const VersionSection = styled.View`
  align-items: center;
`;

export const ListItemHeader = styled.View`
  padding: 10px;
`;

export const ListItemIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: 20,
  color: props.theme.colors.icon.gray,
}))``;

export const AlertIcon = styled(Feather).attrs((props) => ({
  size: 15,
  color: props.theme.colors.icon.error,
  name: "alert-triangle",
}))``;
