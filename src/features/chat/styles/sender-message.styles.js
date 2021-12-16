import styled, { css } from "styled-components/native";

const messageRow = css`
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: 5px;
  border-top-right-radius: 0;
  padding: 12px;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const messageRowRight = css`
  align-self: flex-start;
  margin-left: auto;
`;

export const MessageContainer = styled.View`
  ${messageRow}
  ${messageRowRight}
`;

export const MessageRowSection = styled.View`
  padding-left: 70px;
`;
