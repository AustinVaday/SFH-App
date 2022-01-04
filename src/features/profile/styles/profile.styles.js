import styled from "styled-components/native";
import { Header } from "react-native-elements";

export const ProfileBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-grow: 1;
`;

export const Navbar = styled(Header).attrs((props) => ({
  leftComponent: props.guestUser && {
    icon: "chevron-thin-left",
    type: "entypo",
    color: props.theme.colors.icon.black,
    onPress: () => props.navigation.goBack(),
  },
  rightComponent: !props.guestUser && {
    icon: "dots-horizontal",
    type: "material-community",
    color: props.theme.colors.icon.black,
    onPress: () => props.navigation.navigate("Settings"),
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
  },
}))``;
