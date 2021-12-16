import styled, { css } from "styled-components/native";
import { Image } from "react-native-elements";

const messageRow = css`
  background-color: ${(props) => props.theme.colors.ui.cultured};
  border-radius: 5px;
  border-top-right-radius: 0;
  padding: 12px;
  margin-left: 50px;
  margin-right: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const messageRowLeft = css`
  align-self: flex-start;
`;

export const MessageContainer = styled.View`
  ${messageRow}
  ${messageRowLeft}
`;

export const MessageRowSection = styled.View`
  padding-right: 70px;
`;

export const UserAvatar = styled(Image).attrs({
  containerStyle: { position: "absolute", top: 0, left: -40 },
})`
  height: 30px;
  width: 30px;
  border-radius: 25px;
`;
