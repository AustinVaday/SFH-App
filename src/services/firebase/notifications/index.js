import { firebase } from "../../../utils/firebase";

import { EXPO_NOTIFICATION_API } from "../../../utils/constants";

export const sendNotification = (to, title, body, data) =>
  new Promise((resolve, reject) => {
    if (
      to.notificationToken === null ||
      to.id === firebase.auth().currentUser.uid
    ) {
      return;
    }

    fetch(EXPO_NOTIFICATION_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: to.notificationToken,
        sound: "default",
        title,
        body,
        data,
      }),
    });

    if (data.type === "comment") {
      firebase
        .firestore()
        .collection("activities")
        .doc(to.id)
        .collection("notifications")
        .add({
          type: data.type,
          sender: data.user.id,
          wordId: data.wordId,
          commentId: data.commentId,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => resolve())
        .catch(() => reject());
    } else if (data.type === "upvote") {
      firebase
        .firestore()
        .collection("activities")
        .doc(to.id)
        .collection("notifications")
        .add({
          type: data.type,
          sender: data.user.id,
          wordId: data.wordId,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => resolve())
        .catch(() => reject());
    } else if (data.type === "follow") {
      firebase
        .firestore()
        .collection("activities")
        .doc(to.id)
        .collection("notifications")
        .add({
          type: data.type,
          sender: data.user.id,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => resolve())
        .catch(() => reject());
    }
  });

export const deleteWordUpvoteNotification = (uid, currentUid, wordId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("activities")
      .doc(uid)
      .collection("notifications")
      .where("wordId", "==", wordId)
      .where("type", "==", "upvote")
      .where("sender", "==", currentUid)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        }
      });
  });

export const deleteFollowingNotification = (uid, currentUid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("activities")
      .doc(uid)
      .collection("notifications")
      .where("type", "==", "follow")
      .where("sender", "==", currentUid)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        }
      });
  });

export const deleteCommentNotification = (wordCreator, commentId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("activities")
      .doc(wordCreator)
      .collection("notifications")
      .where("commentId", "==", commentId)
      .where("type", "==", "comment")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        }
      });
  });

export const deleteNotification = (id, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("activities")
      .doc(uid)
      .collection("notifications")
      .doc(id)
      .delete();
  });
