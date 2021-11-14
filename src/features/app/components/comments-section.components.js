import React, { useState, useEffect, useCallback } from "react";
import { Icon, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { CommentCard } from "./comment-card.components";

import { firebase } from "../../../utils/firebase";

import {
  ListEmptySection,
  CommentBarContainer,
  AvatarContainer,
  SendIconContainer,
  CommentInputBar,
} from "../styles/comments-section.styles";

const mockComments = [
  {
    commentID: 1,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 2,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 3,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 4,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 5,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 6,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 7,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 8,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 9,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 10,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 12,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 13,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 14,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 15,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 16,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 17,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 18,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 19,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 20,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 21,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 22,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 23,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 24,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 25,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 26,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 27,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 28,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 29,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 30,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 31,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
  {
    commentID: 32,
    name: "Carlos",
    avatar:
      "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    comment:
      "Ur video is so clear!sd fkds jfksd jkfsjd kfdjsf jskldfj kldsjf kldss dfj sdkjf kldsjfk jdsklfj kdsjf jdksjf dskjf kldjsf jdsfj dsjf jdskfj ksdjf kldsjfkl jdsklf jdklsfj dksjf kldjs kljdsklf jdklsj kldsjf kldjsfkl jdsklfj dklsjf",
    likes: 3,
    date: "22m",
  },
  {
    commentID: 33,
    name: "Carly",
    avatar:
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/05/FB_Avatar_4.jpg",
    comment: "Excellent video!",
    likes: 0,
    date: "14m",
  },
  {
    commentID: 34,
    name: "Austin",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041444-stock-illustration-avatar-man-cartoon.jpg",
    comment: "Wow ur shit",
    likes: -3,
    date: "3m",
  },
];

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
      console.log("enter if")
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

    // textInput.clear();
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
        <MaterialCommunityIcons
          name={"comment-text-outline"}
          size={100}
          color={colors.icon.secondary}
        />
        <Text
          variant="list_empty_message"
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
        contentContainerStyle={{ backgroundColor: "white" }}
      />
      <CommentBarContainer
        style={{ paddingBottom: isKeyboardOpen ? 5 : insets.bottom }}
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
            <Icon
              size={32}
              name="sc-telegram"
              type="evilicon"
              color="blue"
              onPress={() => onCommentSend()}
            />
          </SendIconContainer>
        )}
      </CommentBarContainer>
    </>
  );
};
