import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { Share, Platform, Keyboard } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { throttle } from "throttle-debounce";

import { Text } from "../../../components/typography/text.components";
import { CommentsSection } from "./comments-section.components";

import { getVoteById, updateVote } from "../../../services/user";
import { useSelector } from "react-redux";

import {
  PostBottomContainer,
  IconsSection,
  LeftIconsSection,
  RightIconsSection,
  VoteButtonContainer,
  CommentButtonContainer,
  TitleAndDescriptionSection,
  UpvoteButton,
  DownvoteButton,
  CommentButton,
  ShareButton,
  SaveButton,
  CancelButton,
  CancelButtonContainer,
  HandleTitleContainer,
  CommentModalHandleContainer,
} from "../styles/post-bottom-section.styles";

export const PostBottomSection = ({ post }) => {
  const [saved, setSaved] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [currentVoteState, setCurrentVoteState] = useState({
    upvoted: false,
    downvoted: false,
    counter: post.votesCount,
  });

  const commentSheetRef = useRef();

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    getVoteById(post.id, currentUser.id).then((votesData) => {
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
            updateVote(
              post.id,
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
            updateVote(
              post.id,
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
            updateVote(
              post.id,
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
            updateVote(
              post.id,
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

  const clickSave = () => {
    if (saved) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  };

  const onShare = () => {
    try {
      Share.share({
        url: post.videoThumbnail,
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
        opacity={Platform.OS === "ios" ? 0 : 0.1}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderHandle = useCallback(
    () => (
      <CommentModalHandleContainer>
        <HandleTitleContainer>
          <Text variant="comment_header">{post.commentsCount} Comments</Text>
        </HandleTitleContainer>

        <CancelButtonContainer>
          <CancelButton onPress={() => commentSheetRef.current?.close()} />
        </CancelButtonContainer>
      </CommentModalHandleContainer>
    ),
    []
  );

  return (
    <>
      <PostBottomContainer>
        <TitleAndDescriptionSection>
          <Text variant="post_title">{post.title}</Text>
          {post.description !== "" && (
            <Text variant="post_description">{post.description}</Text>
          )}
        </TitleAndDescriptionSection>

        <IconsSection>
          <LeftIconsSection>
            <VoteButtonContainer currentVoteState={currentVoteState}>
              <UpvoteButton
                upvoted={currentVoteState.upvoted}
                onPress={() => handleVoteUpdate("upvote", currentVoteState)}
              />
              <Text variant="post_numbers">{currentVoteState.counter}</Text>
              <DownvoteButton
                downvoted={currentVoteState.downvoted}
                onPress={() => handleVoteUpdate("downvote", currentVoteState)}
              />
            </VoteButtonContainer>
            <CommentButtonContainer>
              <CommentButton
                onPress={() => commentSheetRef.current?.present()}
              />
              <Text variant="post_numbers">{post.commentsCount}</Text>
            </CommentButtonContainer>
            <ShareButton onPress={onShare} />
          </LeftIconsSection>

          <RightIconsSection>
            <SaveButton saved={saved} onPress={clickSave} />
          </RightIconsSection>
        </IconsSection>
      </PostBottomContainer>

      <BottomSheetModal
        ref={commentSheetRef}
        key="comments-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        enableContentPanningGesture={!isKeyboardOpen}
        enableHandlePanningGesture={!isKeyboardOpen}
        handleComponent={renderHandle}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <CommentsSection postID={post.id} />
      </BottomSheetModal>
    </>
  );
};
