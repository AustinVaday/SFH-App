import styled, { css } from "styled-components/native";
import { Pressable } from "react-native";
import { Image } from "react-native-elements";

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

export const RowHiddenContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.cultured};
`;

export const ActivityBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const Loader = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const ListEmptyBackground = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListEmptyContainer = styled.View`
  padding-top: 25%;
`;

export const NotificationsEmptyImage = styled(Image)`
  width: 300px;
  height: 250px;
`;

export const LoaderImage = styled(Image)`
  width: 100px;
  height: 100px;
`;
