import styled, { css } from "styled-components/native";
import { Dimensions, Pressable } from "react-native";
import { Header } from "react-native-elements";

const backRightBtn = css`
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 75px;
`;

const backRightBtnRight = css`
  background-color: ${(props) => props.theme.colors.text.error};
  right: 0;
`;

export const SwipeDeleteButton = styled(Pressable)`
  ${backRightBtn}
  ${backRightBtnRight}
`;

export const MessagesBackground = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.bg.secondary};
`;

export const ListEmptyBackground = styled.View`
  align-items: center;
  justify-content: center;
  height: ${Dimensions.get("window").height / 2}px;
`;

export const RowHiddenContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.bg.cultured};
`;

export const NavBar = styled(Header).attrs((props) => ({
  rightComponent: {
    icon: "plus",
    type: "material-community",
    color: props.theme.colors.icon.black,
    onPress: () => props.nav.navigate("NewMessage"),
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
  },
}))``;
