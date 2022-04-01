import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { colors } from "../../../../infrastructure/theme/colors";

export const CardBottomBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${(props) => props.isViewWord ? props.insets.bottom : 0}px;
`;

export const IconsContainer = styled.View`
  flex-direction: row;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const LeftIconsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

export const VotesContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const VotesNumberTextContainer = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
`;

export const VoteButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  height: 90%;
  width: 80px;
  background-color: ${(props) =>
    props.currentVoteState.upvoted
      ? colors.button.lighterblue
      : props.currentVoteState.downvoted
      ? colors.button.lightred
      : colors.button.foggedglass};
`;

export const CommentButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
  padding-right: ${(props) => props.theme.space[2]};
`;

export const CommentButton = styled(Icon).attrs({
  size: 25,
  name: "comment",
  type: "material-community",
  color: colors.icon.secondary,
  iconStyle: { padding: 8 },
})``;

export const ShareButton = styled(Icon).attrs({
  size: 30,
  name: "share",
  type: "material-community",
  color: colors.icon.secondary,
  iconStyle: { padding: 8 },
})``;

export const TitleAndDescriptionContainer = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const UpvoteButton = styled(Icon).attrs((props) => ({
  size: 25,
  type: "material-community",
  color: colors.icon.secondary,
  name: props.upvoted ? "arrow-up-bold" : "arrow-up-bold-outline",
  iconStyle: { paddingLeft: 8 },
}))``;

export const DownvoteButton = styled(Icon).attrs((props) => ({
  size: 25,
  type: "material-community",
  color: colors.icon.secondary,
  name: props.downvoted ? "arrow-down-bold" : "arrow-down-bold-outline",
  iconStyle: { paddingRight: 8 },
}))``;

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
