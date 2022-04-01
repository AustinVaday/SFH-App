import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { Share, Platform } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { throttle } from "throttle-debounce";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import { CommentsList } from "./comments-modal/comments-list.components";
import { numberFormatter } from "../../../components/utilities/number-formatter.components";

import {
  getWordVoteByUserId,
  updateWordVote,
} from "../../../services/firebase/words";
import {
  sendNotification,
  deleteWordUpvoteNotification,
} from "../../../services/firebase/notifications";
import { useSelector } from "react-redux";

import {
  CardBottomBarContainer,
  IconsContainer,
  LeftIconsContainer,
  VoteButtonContainer,
  CommentButtonContainer,
  TitleAndDescriptionContainer,
  UpvoteButton,
  DownvoteButton,
  CommentButton,
  ShareButton,
  CancelButton,
  CancelButtonContainer,
  HandleTitleContainer,
  CommentModalHandleContainer,
  VotesContainer,
  VotesNumberTextContainer,
} from "./styles/card-bottom-bar.styles";

export const CardBottomBar = ({ isViewWord, word, user, navigation }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [commentsCount, setCommentsCount] = useState(word.commentsCount);
  const [currentVoteState, setCurrentVoteState] = useState({
    upvoted: false,
    downvoted: false,
    counter: word.votesCount,
  });

  const commentSheetRef = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getWordVoteByUserId(word.id, currentUser.id).then((votesData) => {
      if (votesData) {
        setCurrentVoteState({
          ...currentVoteState,
          upvoted: votesData.upvoted,
          downvoted: votesData.downvoted,
        });
      }
    });
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
            updateWordVote(
              word.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              !currentVoteStateInst.downvoted
            );
            sendNotification(
              user,
              "Signs of Humanity",
              `${currentUser.username}` + " just upvoted on your word",
              {
                type: "upvote",
                user: currentUser,
                wordId: word.id,
              }
            );
          } else {
            setCurrentVoteState({
              upvoted: !currentVoteStateInst.upvoted,
              downvoted: currentVoteStateInst.downvoted,
              counter:
                currentVoteStateInst.counter +
                (currentVoteStateInst.upvoted ? -1 : 1),
            });
            updateWordVote(
              word.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              currentVoteStateInst.downvoted
            );

            if (!currentVoteStateInst.upvoted) {
              sendNotification(
                user,
                "Signs of Humanity",
                `${currentUser.username}` + " just upvoted on your word",
                {
                  type: "upvote",
                  user: currentUser,
                  wordId: word.id,
                }
              );
            } else {
              deleteWordUpvoteNotification(user.id, currentUser.id, word.id);
            }
          }
        } else {
          if (currentVoteStateInst.upvoted) {
            setCurrentVoteState({
              upvoted: !currentVoteStateInst.upvoted,
              downvoted: !currentVoteStateInst.downvoted,
              counter: currentVoteStateInst.counter - 2,
            });
            updateWordVote(
              word.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              !currentVoteStateInst.downvoted
            );
            deleteWordUpvoteNotification(user.id, currentUser.id, word.id);
          } else {
            setCurrentVoteState({
              upvoted: currentVoteStateInst.upvoted,
              downvoted: !currentVoteStateInst.downvoted,
              counter:
                currentVoteStateInst.counter +
                (currentVoteStateInst.downvoted ? 1 : -1),
            });
            updateWordVote(
              word.id,
              currentUser.id,
              currentVoteStateInst.upvoted,
              !currentVoteStateInst.downvoted
            );
          }
        }
      }),
    []
  );

  const snapPoints = useMemo(() => ["75%"], []);

  const onShare = () => {
    try {
      Share.share({
        url: word.videoThumbnail,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={Platform.OS === "ios" ? 0.4 : 0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderHandle = () => (
    <CommentModalHandleContainer>
      <HandleTitleContainer>
        <Text variant="comment_header">{commentsCount} Comments</Text>
      </HandleTitleContainer>

      <CancelButtonContainer>
        <CancelButton onPress={() => commentSheetRef.current?.close()} />
      </CancelButtonContainer>
    </CommentModalHandleContainer>
  );

  return (
    <>
      <CardBottomBarContainer isViewWord={isViewWord} insets={insets}>
        <TitleAndDescriptionContainer>
          <Text variant="word_title">{word.title}</Text>
          {word.description !== "" && (
            <Text variant="word_description">{word.description}</Text>
          )}
        </TitleAndDescriptionContainer>

        <IconsContainer>
          <LeftIconsContainer>
            <VotesContainer>
              <VoteButtonContainer currentVoteState={currentVoteState}>
                <UpvoteButton
                  upvoted={currentVoteState.upvoted}
                  onPress={() => handleVoteUpdate("upvote", currentVoteState)}
                />
                <Text variant="slash">|</Text>
                <DownvoteButton
                  downvoted={currentVoteState.downvoted}
                  onPress={() => handleVoteUpdate("downvote", currentVoteState)}
                />
              </VoteButtonContainer>
              <VotesNumberTextContainer>
                <Text variant="word_numbers">
                  {numberFormatter(currentVoteState.counter)}
                </Text>
              </VotesNumberTextContainer>
            </VotesContainer>

            <CommentButtonContainer>
              <CommentButton
                onPress={() => commentSheetRef.current.present()}
              />
              <Text variant="word_numbers">{commentsCount}</Text>
            </CommentButtonContainer>
            <ShareButton onPress={onShare} />
          </LeftIconsContainer>
        </IconsContainer>
      </CardBottomBarContainer>

      <BottomSheetModal
        ref={commentSheetRef}
        key="comments-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        handleComponent={renderHandle}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        enablePanDownToClose
      >
        <CommentsList
          wordData={word}
          user={user}
          setCommentsCount={setCommentsCount}
          navigation={navigation}
        />
      </BottomSheetModal>
    </>
  );
};
