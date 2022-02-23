import styled from "styled-components/native";
import { Header } from "react-native-elements";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const ProfileBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-grow: 1;
`;

export const Navbar = styled(Header).attrs((props) => ({
  leftComponent: props.isGuest && {
    icon: "arrow-back-ios",
    type: "material-icon",
    color: props.theme.colors.icon.black,
    onPress: () => props.navigation.goBack(),
  },
  rightComponent: props.isOtherUser
    ? {
        icon: "dots-horizontal",
        type: "material-community",
        color: props.theme.colors.icon.black,
        onPress: () => props.userSettings(),
      }
    : !props.isGuest && {
        icon: "settings-outline",
        type: "ionicon",
        color: props.theme.colors.icon.black,
        onPress: () => props.navigation.navigate("Settings"),
      },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
    position: "absolute",
  },
}))``;

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

export const UserSettingsIcon = styled(MaterialCommunityIcons).attrs(
  (props) => ({
    name: "dots-horizontal",
    size: 24,
    color: props.theme.colors.icon.black,
  })
)`
  margin-right: 10px;
`;
