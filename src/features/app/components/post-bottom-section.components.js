import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { Share, View, Platform, Keyboard } from "react-native";
import { IconButton } from "react-native-paper";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { throttle } from "throttle-debounce";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { CommentsSection } from "./comments-section.components";

import { useSelector } from "react-redux";

import {
  BottomCard,
  IconsSection,
  LeftIconsSection,
  RightIconsSection,
  LikeButton,
  CommentButton,
  TitleAndCaptionSection,
} from "../styles";
import { getVoteById, updateVote } from "../../../services/user";

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

  const likeButtonStyle = () => {
    if (currentVoteState.upvoted) {
      return {
        backgroundColor: colors.brand.primary,
      };
    } else if (currentVoteState.downvoted) {
      return {
        backgroundColor: colors.ui.error,
      };
    } else {
      return {
        backgroundColor: "rgba(192, 192, 192, 0.5)",
      };
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
      <View style={{ margin: 10, flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text variant="comment_header">{post.commentsCount} Comments</Text>
        </View>

        <View style={{ position: "absolute", right: 0, top: -10 }}>
          <Button
            icon={<Ionicons name="close" size={24} color="black" />}
            type="clear"
            onPress={() => commentSheetRef.current?.close()}
          />
        </View>
      </View>
    ),
    []
  );

  return (
    <>
      <BottomCard>
        <TitleAndCaptionSection>
          <Text variant="title">{post.title}</Text>
          {post.description !== "" && (
            <Text variant="caption">{post.description}</Text>
          )}
        </TitleAndCaptionSection>

        <IconsSection>
          <LeftIconsSection>
            <LikeButton style={likeButtonStyle()}>
              <IconButton
                icon={"arrow-up-bold"}
                color={colors.icon.primary}
                underlayColor="transparent"
                style={{ margin: 0 }}
                size={25}
                onPress={() => handleVoteUpdate("upvote", currentVoteState)}
              />
              <Text variant="numbers">{currentVoteState.counter}</Text>
              <IconButton
                icon={"arrow-down-bold"}
                color={colors.icon.primary}
                underlayColor="transparent"
                style={{ paddingTop: 2, margin: 0 }}
                size={25}
                onPress={() => handleVoteUpdate("downvote", currentVoteState)}
              />
            </LikeButton>
            <CommentButton>
              <IconButton
                icon="message"
                color={colors.icon.primary}
                underlayColor="transparent"
                style={{ margin: 0 }}
                size={25}
                onPress={() => commentSheetRef.current?.present()}
              />
              <Text variant="numbers">{post.commentsCount}</Text>
            </CommentButton>

            <IconButton
              icon="send"
              color={colors.icon.primary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={25}
              onPress={onShare}
            />
          </LeftIconsSection>

          <RightIconsSection>
            <IconButton
              icon={saved ? "bookmark" : "bookmark-outline"}
              color={saved ? colors.brand.primary : colors.icon.primary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={25}
              onPress={clickSave}
            />
          </RightIconsSection>
        </IconsSection>
      </BottomCard>

      <BottomSheetModal
        ref={commentSheetRef}
        key="comments-sheet-modal"
        index={0}
        // bottomInset={insets.bottom}
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
