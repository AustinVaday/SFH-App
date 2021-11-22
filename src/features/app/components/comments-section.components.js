import React, { useState, useEffect, useCallback } from "react";
import { Avatar } from "react-native-elements";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import { CommentCard } from "./comment-card.components";

import { firebase } from "../../../utils/firebase";

import {
  ListEmptySection,
  CommentBarContainer,
  AvatarContainer,
  SendIconContainer,
  CommentInputBar,
  CommentTextIcon,
  CommentSendButton,
} from "../styles/comments-section.styles";

export const CommentsSection = ({ postID }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    getComments();
  }, [postID, refresh]);

  const getComments = () => {
    if (postID !== postId || refresh) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;

            return { id, ...data };
          });
          setComments(comments);
          setRefresh(false);
        });
      setPostId(postID);
    }
  };

  const onCommentSend = () => {
    const textToSend = comment;

    setComment("");

    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        text: textToSend,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setRefresh(true);
      });
  };

  const listEmptyComponent = useCallback(() => {
    return (
      <ListEmptySection>
        <CommentTextIcon />
        <Text
          variant="comment_list_empty_title"
          style={{
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          No Comments
        </Text>
      </ListEmptySection>
    );
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <CommentCard item={item} />;
  }, []);

  return (
    <>
      <BottomSheetFlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
      />
      <CommentBarContainer
        isKeyboardOpen={isKeyboardOpen}
        insetsBottom={insets.bottom}
      >
        <AvatarContainer>
          <Avatar
            size="small"
            rounded
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
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
          <SendIconContainer>
            <CommentSendButton onPress={() => onCommentSend()} />
          </SendIconContainer>
        )}
      </CommentBarContainer>
    </>
  );
};
