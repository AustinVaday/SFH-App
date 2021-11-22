import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { colors } from "../../../infrastructure/theme/colors";

export const PostBottomContainer = styled.View`
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

export const VoteButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 25px;
  background-color: ${(props) =>
    props.currentVoteState.upvoted
      ? colors.button.primary
      : props.currentVoteState.downvoted
      ? colors.button.error
      : colors.button.foggedglass};
`;

export const CommentButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

export const CommentButton = styled(Icon).attrs({
  size: 25,
  name: "comment",
  type: "material-community",
  color: colors.icon.secondary,
})`
  margin: ${(props) => props.theme.space[2]};
`;

export const ShareButton = styled(Icon).attrs({
  size: 30,
  name: "share",
  type: "material-community",
  color: colors.icon.secondary,
})`
  margin: ${(props) => props.theme.space[1]};
`;

export const SaveButton = styled(Icon).attrs((props) => ({
  size: 30,
  type: "material-community",
  name: props.saved ? "bookmark" : "bookmark-plus-outline",
  color: props.saved ? colors.icon.primary : colors.icon.secondary,
}))`
  margin: ${(props) => props.theme.space[1]};
`;

export const TitleAndDescriptionSection = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const UpvoteButton = styled(Icon).attrs((props) => ({
  size: 25,
  type: "material-community",
  color: colors.icon.secondary,
  name: props.upvoted ? "arrow-up-bold" : "arrow-up-bold-outline",
}))`
  margin: ${(props) => props.theme.space[2]};
`;

export const DownvoteButton = styled(Icon).attrs((props) => ({
  size: 25,
  type: "material-community",
  color: colors.icon.secondary,
  name: props.downvoted ? "arrow-down-bold" : "arrow-down-bold-outline",
}))`
  margin: ${(props) => props.theme.space[2]};
`;

export const CancelButton = styled(Icon).attrs({
  size: 24,
  name: "close",
  type: "material-community",
  color: colors.button.black,
})`
  margin: 6px;
`;

export const CancelButtonContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: -10px;
`;

export const HandleTitleContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const CommentModalHandleContainer = styled.View`
  margin: 10px;
  flex-direction: row;
`;
