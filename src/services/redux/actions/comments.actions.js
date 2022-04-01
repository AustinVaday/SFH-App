import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";
import {
  sendNotification,
  deleteCommentNotification,
} from "../../firebase/notifications";

import { commentsAction } from "../constants";

export const fetchComments = (wordId, setLoading) => (dispatch, getState) => {
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .doc(wordId)
      .collection("comments")
      .orderBy("creation", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        let comments = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });

        dispatch({
          type: commentsAction.FETCH_COMMENTS_SUCCESS,
          comments,
          wordId,
        });

        setLoading(false);
      })
      .catch((error) => {
        dispatch({ type: commentsAction.FETCH_COMMENTS_FAILURE, error });
        setLoading(false);
      });
  });
};

export const addComment =
  (wordId, text, otherUser, currentUser, setCommentsCount) =>
  (dispatch, getState) => {
    new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("words")
        .doc(wordId)
        .collection("comments")
        .add({
          creator: currentUser.id,
          text,
          votesCount: 0,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((documentAdded) => {
          let comment = {
            creator: currentUser.id,
            text: text,
            votesCount: 0,
            creation: null,
          };

          comment.id = documentAdded.id;

          dispatch({
            type: commentsAction.ADD_COMMENT_SUCCESS,
            comment,
          });

          setCommentsCount((count) => count + 1);

          sendNotification(
            otherUser,
            "Signs of Humanity",
            `${currentUser.username}` + " just commented on your word",
            {
              type: "comment",
              user: currentUser,
              wordId,
              commentId: documentAdded.id,
              comment: text,
            }
          );
        })
        .catch((error) => {
          dispatch({
            type: commentsAction.ADD_COMMENT_FAILURE,
            error,
          });
        });
    });
  };

export const deleteComment =
  (wordData, commentId, setCommentsCount) => (dispatch, getState) => {
    new Promise((resolve, reject) => {
      const ref = firebase
        .firestore()
        .collection("words")
        .doc(wordData.id)
        .collection("comments")
        .doc(commentId)
        .collection("votes");

      ref.onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          ref.doc(doc.id).delete();
        });

        firebase
          .firestore()
          .collection("words")
          .doc(wordData.id)
          .collection("comments")
          .doc(commentId)
          .delete()
          .then(() => {
            dispatch({
              type: commentsAction.DELETE_COMMENT_SUCCESS,
              commentId,
            });

            setCommentsCount((count) => count - 1);

            Toast.show({
              type: "infoMessage",
              props: {
                message: "Deleted comment.",
              },
              visibilityTime: 3000,
              topOffset: 45,
            });

            deleteCommentNotification(wordData.creator, commentId);
          })
          .catch((error) => {
            dispatch({
              type: commentsAction.DELETE_COMMENT_FAILURE,
              error,
            });
          });
      });
    });
  };
