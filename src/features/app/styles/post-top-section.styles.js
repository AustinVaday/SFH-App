import styled from "styled-components/native";

export const TopSection = styled.View`
  padding-right: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const NameAndDate = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const PostSettingsButton = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: ${(props) => props.theme.space[2]};
`;
