import React, { useState, useEffect, useMemo } from "react";
import { Avatar } from "react-native-elements";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { throttle } from "throttle-debounce";

import { Text } from "../../../../components/typography/text.components";
import { colors } from "../../../../infrastructure/theme/colors";
import { timeDifference } from "../../../../components/utilities/time-difference.components";
import { numberFormatter } from "../../../../components/utilities/number-formatter.components";

import { useDispatch, useSelector } from "react-redux";
import {
  getCommentVoteByUserId,
  updateCommentVote,
} from "../../../../services/firebase/comments";
import { useUser } from "../../../../services/hooks/useUser";
import { deleteComment } from "../../../../services/redux/actions/comments.actions";

import {
  CommentCardContainer,
  RightSideCommentCardContainer,
  UsernameAndCommentContainer,
  BelowCommentCardContainer,
  VoteButtonsContainer,
  CommentUpvoteButton,
  CommentDownvoteButton,
} from "./styles/comment-card.styles";

export const CommentCard = ({ item, wordData, setCommentsCount, navigation }) => {
  const [currentVoteState, setCurrentVoteState] = useState({
    upvoted: false,
    downvoted: false,
    counter: item.votesCount,
  });

  const user = useUser(item.creator).data;

  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    getCommentVoteByUserId(wordData.id, item.id, currentUser.id).then(
      (votesData) => {
        if (votesData) {
          setCurrentVoteState({
            ...currentVoteState,
            upvoted: votesData.upvoted,
            downvoted: votesData.downvoted,
          });
        }
      }
    );
  }, []);

  const handleVoteUpdate = useMemo(
    () =>
      throttle(500, true, (voteType, currentVoteStateInst) => {
        if (voteType === "upvote") {
          if (currentVoteStateInst.downvoted) {
            setCurrentVoteState({
              upvoted: !currentVoteStateInst.upvoted,
              downvoted: !currentVoteStateInst.downvoted,
              counter: currentVoteStateInst.counter + 2,
            });
            updateCommentVote(
              wordData.id,
              item.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              !currentVoteStateInst.downvoted
            );
          } else {
            setCurrentVoteState({
              upvoted: !currentVoteStateInst.upvoted,
              downvoted: currentVoteStateInst.downvoted,
              counter:
                currentVoteStateInst.counter +
                (currentVoteStateInst.upvoted ? -1 : 1),
            });
            updateCommentVote(
              wordData.id,
              item.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              currentVoteStateInst.downvoted
            );
          }
        } else {
          if (currentVoteStateInst.upvoted) {
            setCurrentVoteState({
              upvoted: !currentVoteStateInst.upvoted,
              downvoted: !currentVoteStateInst.downvoted,
              counter: currentVoteStateInst.counter - 2,
            });
            updateCommentVote(
              wordData.id,
              item.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              !currentVoteStateInst.downvoted
            );
          } else {
            setCurrentVoteState({
              upvoted: currentVoteStateInst.upvoted,
              downvoted: !currentVoteStateInst.downvoted,
              counter:
                currentVoteStateInst.counter +
                (currentVoteStateInst.downvoted ? 1 : -1),
            });
            updateCommentVote(
              wordData.id,
              item.id,
              currentUser.id,
              currentVoteStateInst.upvoted,
              !currentVoteStateInst.downvoted
            );
          }
        }
      }),
    []
  );

  const onCommentActions = () =>
    showActionSheetWithOptions(
      {
        options:
          currentUser.id === item.creator
            ? ["Cancel", "Delete comment"]
            : ["Cancel", "Report"],
        cancelButtonIndex: 0,
        destructiveButtonIndex: currentUser.id === item.creator ? 1 : null,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          currentUser.id === item.creator
            ? dispatch(deleteComment(wordData, item.id, setCommentsCount))
            : console.log("report");
        }
      }
    );

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
        onPress={() =>
          navigation.push("GuestProfile", {
            uid: user?.id,
            isGuest: true,
            isOtherUser: currentUser.id !== user?.id,
          })
        }
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
            <CommentUpvoteButton
              upvoted={currentVoteState.upvoted}
              onPress={() => handleVoteUpdate("upvote", currentVoteState)}
            />
            <Text variant="comment_votes">
              {numberFormatter(currentVoteState.counter)}
            </Text>
            <CommentDownvoteButton
              downvoted={currentVoteState.downvoted}
              onPress={() => handleVoteUpdate("downvote", currentVoteState)}
            />
          </VoteButtonsContainer>
        </BelowCommentCardContainer>
      </RightSideCommentCardContainer>
    </CommentCardContainer>
  );
};
