import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { timeDifference } from "../../../components/utilities/time-difference.components";

import { useSelector } from "react-redux";
import { deleteComment } from "../../../services/user";
import { useUser } from "../../../services/hooks/useUser";

import {
  CommentCardContainer,
  RightSideCommentCardContainer,
  UsernameAndCommentContainer,
  BelowCommentCardContainer,
  VoteButtonsContainer,
  CommentUpvoteButton,
  CommentDownvoteButton,
} from "../styles/comment-card.styles";

export const CommentCard = ({ item, postData }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const user = useUser(item.creator).data;

  const currentUser = useSelector((state) => state.auth.currentUser);

  const { showActionSheetWithOptions } = useActionSheet();

  const onCommentActions = () =>
    showActionSheetWithOptions(
      {
        options: currentUser.id === item.creator ? ["Cancel", "Delete"] : ["Cancel", "Report"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          currentUser.id === item.creator ? deleteComment(postData, item.id) : console.log("report");
        }
      }
    );

  const clickLike = () => {
    if (upvoted) {
      setUpvoted(false);
      setDownvoted(false);
    } else {
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const clickDislike = () => {
    if (downvoted) {
      setDownvoted(false);
      setUpvoted(false);
    } else {
      setUpvoted(false);
      setDownvoted(true);
    }
  };

  return (
    <CommentCardContainer
      onLongPress={onCommentActions}
      style={({ pressed }) => [
        { backgroundColor: pressed ? colors.bg.cultured : colors.bg.secondary },
      ]}
    >
      <Avatar
        rounded
        size="small"
        source={{ uri: user?.profilePhoto }}
        onPress={() => console.log("avatar clicked")}
      />
      <RightSideCommentCardContainer>
        <UsernameAndCommentContainer>
          <Text variant="comment_name">{user?.username}</Text>
          <Text variant="comment">{item.text}</Text>
        </UsernameAndCommentContainer>
        <BelowCommentCardContainer>
          <Text variant="comment_date">
            {item.creation === null
              ? "now"
              : timeDifference(new Date(), item.creation.toDate())}
          </Text>
          <VoteButtonsContainer>
            <CommentUpvoteButton upvoted={upvoted} onPress={clickLike} />
            <Text variant="comment_votes">{}</Text>
            <CommentDownvoteButton
              downvoted={downvoted}
              onPress={clickDislike}
            />
          </VoteButtonsContainer>
        </BelowCommentCardContainer>
      </RightSideCommentCardContainer>
    </CommentCardContainer>
  );
};
