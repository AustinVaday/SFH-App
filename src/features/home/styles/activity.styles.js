import styled, { css } from "styled-components/native";
import { Pressable } from "react-native";

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
