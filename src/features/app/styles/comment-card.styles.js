import styled from "styled-components/native";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";

export const CommentCardContainer = styled.View`
  flex-direction: row;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
`;

export const RightSideCommentCardContainer = styled.View`
  flex: 1;
  padding-left: ${(props) => props.theme.space[2]};
`;

export const UsernameAndCommentContainer = styled(Card).attrs(props => ({
  containerStyle: {
    backgroundColor: props.theme.colors.bg.cultured,
    padding: 8,
    margin: 0,
    borderRadius: 5,
  }
}))``;

export const BelowCommentCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const VoteButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
`;

export const CommentUpvoteButton = styled(Icon).attrs((props) => ({
  name: props.upvoted ? "arrow-up-bold" : "arrow-up-bold-outline",
  type: "material-community",
  color: props.upvoted
    ? props.theme.colors.icon.primary
    : props.theme.colors.icon.lightgray,
  underlayColor: "transparent",
  size: 20,
}))`
  padding: 5px;
`;

export const CommentDownvoteButton = styled(Icon).attrs((props) => ({
  name: props.downvoted ? "arrow-down-bold" : "arrow-down-bold-outline",
  type: "material-community",
  color: props.downvoted
    ? props.theme.colors.icon.primary
    : props.theme.colors.icon.lightgray,
  underlayColor: "transparent",
  size: 20,
}))`
  padding: 5px;
  padding-top: 7px;
`;
