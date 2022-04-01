import { firebase } from "../../../utils/firebase";

export const getCommentVoteByUserId = (wordId, commentId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .doc(wordId)
      .collection("comments")
      .doc(commentId)
      .collection("votes")
      .doc(uid)
      .get()
      .then((res) => {
        resolve(res.data());
      })
      .catch(() => reject());
  });

export const updateCommentVote = (
  wordId,
  commentId,
  userId,
  upvoted,
  downvoted
) =>
  new Promise((resolve, reject) => {
    if (upvoted === false && downvoted === false) {
      firebase
        .firestore()
        .collection("words")
        .doc(wordId)
        .collection("comments")
        .doc(commentId)
        .collection("votes")
        .doc(userId)
        .delete();
    } else {
      firebase
        .firestore()
        .collection("words")
        .doc(wordId)
        .collection("comments")
        .doc(commentId)
        .collection("votes")
        .doc(userId)
        .set({
          upvoted,
          downvoted,
        });
    }
  });
