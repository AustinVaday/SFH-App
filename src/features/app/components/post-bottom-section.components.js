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

import {
  getVoteById,
  updateVote,
  sendNotification,
  removeUpvoteNotification,
  saveVideo,
  deleteSaveVideo,
} from "../../../services/user";
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

export const PostBottomSection = ({ post, user }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const saves = useSelector((state) => state.posts.saves);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [saveState, setSaveState] = useState({
    saved: false,
    saveId: null,
  });
  const [currentVoteState, setCurrentVoteState] = useState({
    upvoted: false,
    downvoted: false,
    counter: post.votesCount,
  });

  const commentSheetRef = useRef();

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

    const saveIndex = saves.findIndex((el) => el.postId === post.id);

    if (saveIndex > -1) {
      setSaveState({ saved: true, saveId: saves[saveIndex].id });
    }
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
            sendNotification(
              user,
              "Signs of Humanity",
              `${currentUser.username}` + " just upvoted on your post",
              {
                type: "upvote",
                user: currentUser,
                postId: post.id,
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
            updateVote(
              post.id,
              currentUser.id,
              !currentVoteStateInst.upvoted,
              currentVoteStateInst.downvoted
            );

            if (!currentVoteStateInst.upvoted) {
              sendNotification(
                user,
                "Signs of Humanity",
                `${currentUser.username}` + " just upvoted on your post",
                {
                  type: "upvote",
                  user: currentUser,
                  postId: post.id,
                }
              );
            } else {
              removeUpvoteNotification(user.id, currentUser.id, post.id);
            }
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
            removeUpvoteNotification(user.id, currentUser.id, post.id);
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

  const onSave = () => {
    if (saveState.saved) {
      deleteSaveVideo(saveState.saveId, currentUser.id).then((isRemoveSaved) =>
        setSaveState({ saved: isRemoveSaved, saveId: null })
      );
    } else {
      saveVideo(post.id, currentUser.id).then((saveData) =>
        setSaveState({ saved: saveData.isSaved, saveId: saveData.saveId })
      );
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
            <SaveButton saved={saveState.saved} onPress={onSave} />
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
        <CommentsSection postData={post} user={user} />
      </BottomSheetModal>
    </>
  );
};
