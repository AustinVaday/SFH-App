import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, Keyboard } from "react-native";
import { Avatar } from "react-native-elements";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from "react-native-safe-area-context";

import { Text } from "../../../../components/typography/text.components";
import { CommentCard } from "./comment-card.components";
import { LoadingIndicator } from "../../../../components/loading/loading-indicator.components";

import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../../../services/hooks/useUser";
import {
  addComment,
  fetchComments,
} from "../../../../services/redux/actions/comments.actions";

import {
  ListEmptyContainer,
  CommentBarContainer,
  AvatarContainer,
  SendButtonContainer,
  CommentInputBar,
  CommentTextIcon,
  SendButton,
} from "./styles/comments-list.styles";

export const CommentsList = ({ wordData, setCommentsCount, navigation }) => {
  const [comment, setComment] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { comments, wordId } = useSelector((state) => state.comments);
  const { currentUser } = useSelector((state) => state.user);
  const user = useUser(wordData.creator).data;

  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();
  const ANDROID_NOTCH_FIXED =
    useSafeAreaFrame().height.toFixed(1) -
    Dimensions.get("window").height.toFixed(1);

  useEffect(() => {
    if (wordId !== wordData.id) {
      dispatch(fetchComments(wordData.id, setLoading));
    } else {
      setLoading(false);
    }
  }, []);

  const onCommentSend = () => {
    const textToSend = comment;

    setComment("");

    Keyboard.dismiss();

    dispatch(
      addComment(wordData.id, textToSend, user, currentUser, setCommentsCount)
    );
  };

  const listEmptyComponent = useCallback(() => {
    return (
      <ListEmptyContainer>
        <CommentTextIcon />
        <Text
          variant="comment_list_empty_title"
          style={{
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          Be the first to comment!
        </Text>
      </ListEmptyContainer>
    );
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CommentCard item={item} wordData={wordData} setCommentsCount={setCommentsCount} navigation={navigation} />
    );
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <BottomSheetFlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          bounces={false}
        />
      )}

      <CommentBarContainer
        isKeyboardOpen={isKeyboardOpen}
        insetsBottom={insets.bottom}
        androidNotchFixed={ANDROID_NOTCH_FIXED}
      >
        <AvatarContainer>
          <Avatar
            size="small"
            rounded
            source={{
              uri: currentUser.profilePhoto,
            }}
          />
        </AvatarContainer>

        <CommentInputBar
          placeholder="Add a comment..."
          onFocus={() => setIsKeyboardOpen(true)}
          onBlur={() => setIsKeyboardOpen(false)}
          value={comment}
          multiline={true}
          onChangeText={(text) => setComment(text)}
        />
        {comment !== "" && (
          <SendButtonContainer>
            <SendButton onPress={onCommentSend} />
          </SendButtonContainer>
        )}
      </CommentBarContainer>
    </>
  );
};
