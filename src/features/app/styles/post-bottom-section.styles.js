import styled from "styled-components/native";

export const BottomCard = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const IconsSection = styled.View`
  flex-direction: row;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const LeftIconsSection = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const RightIconsSection = styled.View`
  justify-content: flex-end;
`;

export const LikeButton = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 25px;
`;

export const CommentButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

export const TitleAndCaptionSection = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;
