import React, { useState, useEffect, useCallback } from "react";
import { Avatar } from "react-native-elements";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import { CommentCard } from "./comment-card.components";

import { useSelector } from "react-redux";
import { firebase } from "../../../utils/firebase";
import { sendNotification } from "../../../services/user";

import {
  ListEmptySection,
  CommentBarContainer,
  AvatarContainer,
  SendIconContainer,
  CommentInputBar,
  CommentTextIcon,
  CommentSendButton,
} from "../styles/comments-section.styles";

export const CommentsSection = ({ postData, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    getComments();
  }, [postData.id, refresh]);

  const getComments = () => {
    if (postData.id !== postId || refresh) {

      firebase
        .firestore()
        .collection("posts")
        .doc(postData.id)
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
      setPostId(postData.id);
    }
  };

  const onCommentSend = async () => {
    const textToSend = comment;

    setComment("");

    let commentId = firebase
      .firestore()
      .collection("posts")
      .doc(postData.id)
      .collection("comments")
      .add({
        creator: currentUser.id,
        text: textToSend,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      });

    try {
      const commentIdAdded = await commentId;

      sendNotification(
        user,
        "Signs of Humanity",
        `${currentUser.username}` + " just commented on your post",
        {
          type: "comment",
          user: currentUser,
          postId: postData.id,
          commentId: commentIdAdded.id,
          comment: textToSend,
        }
      );

      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
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
          Be the first to comment!
        </Text>
      </ListEmptySection>
    );
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <CommentCard item={item} postData={postData} />;
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
          <SendIconContainer>
            <CommentSendButton onPress={() => onCommentSend()} />
          </SendIconContainer>
        )}
      </CommentBarContainer>
    </>
  );
};
