import styled from "styled-components/native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const ProfileBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-grow: 1;
`;

export const CurrentUserIconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TabIcon = styled(Ionicons).attrs({
  size: 25,
})``;

export const ReportIcon = styled(Ionicons).attrs((props) => ({
  name: "flag-outline",
  size: 24,
  color: props.theme.colors.icon.black,
}))``;

export const BlockIcon = styled(MaterialIcons).attrs((props) => ({
  name: "block",
  size: 24,
  color: props.theme.colors.icon.black,
}))``;

export const SettingsIcon = styled(Ionicons).attrs((props) => ({
  name: "settings-outline",
  size: 24,
  color: props.theme.colors.icon.black,
}))`
  margin-right: 10px;
`;

export const OtherUserSettingsIcon = styled(MaterialCommunityIcons).attrs(
  (props) => ({
    name: "dots-horizontal",
    size: 24,
    color: props.theme.colors.icon.black,
  })
)`
  margin-right: 10px;
`;

export const FavoriteIcon = styled(Ionicons).attrs((props) => ({
  name: "bookmark-outline",
  size: 24,
  color: props.theme.colors.icon.black,
}))`
  margin-right: 16px;
`;
