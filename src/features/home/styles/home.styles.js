import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Header, Image } from "react-native-elements";

export const HomeBackground = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ListEmptyBackground = styled.View`
  align-items: center;
  justify-content: center;
  height: ${Dimensions.get("window").height / 2}px;
`;

export const Navbar = styled(Header).attrs((props) => ({
  centerContainerStyle: { justifyContent: "center" },
  rightComponent: {
    icon: "bell-outline",
    type: "material-community",
    color: props.theme.colors.icon.black,
    onPress: () => props.navigation.navigate("Activity"),
  },
  rightContainerStyle: { justifyContent: "center" },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
    paddingVertical: 2,
  },
}))``;

export const SFHLogoImage = styled(Image)`
  width: 60px;
  height: 35px;
`;
