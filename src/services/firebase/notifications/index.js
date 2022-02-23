import { firebase } from "../../../utils/firebase";

export const sendNotification = (to, title, body, data) =>
  new Promise((resolve, reject) => {
    if (to.notificationToken === null) {
      return;
    }

    fetch("https://exp.host/--/api/v2/push/send", {
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
          postId: data.postId,
          commentId: data.commentId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
          postId: data.postId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => resolve())
        .catch(() => reject());
    }
  });

export const deleteUpvoteNotification = (uid, currentUid, postId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("activities")
      .doc(uid)
      .collection("notifications")
      .where("postId", "==", postId)
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

export const deleteCommentNotification = (postCreator, commentId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("activities")
      .doc(postCreator)
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
