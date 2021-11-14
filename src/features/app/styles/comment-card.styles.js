import styled from "styled-components/native";
import { Card } from "react-native-elements";
import { colors } from "../../../infrastructure/theme/colors";

export const CommentSection = styled.View`
  flex-direction: row;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
`;

export const RightSideCommentSection = styled.View`
  flex: 1;
  padding-left: ${(props) => props.theme.space[2]};
`;

export const NameAndCommentCard = styled(Card).attrs({
  containerStyle: {
    backgroundColor: colors.ui.comment,
    padding: 8,
    margin: 0,
    borderRadius: 5,
  },
})``;

export const BottomRightSideCommentSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const LikesSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
`;
