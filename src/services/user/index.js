import { firebase } from "../../utils/firebase";
import { saveMediaToStorage } from "./random";

export const saveUserProfileImage = (image) => {
  saveMediaToStorage(
    image,
    `profileImage/${firebase.auth().currentUser.uid}`
  ).then((res) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        profilePhoto: res,
      })
      .then(() => {})
      .catch(() => {});
  });
};

export const saveUserField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const queryUsersByUsername = (username) =>
  new Promise((resolve, reject) => {
    if (username === "") {
      resolve([]);
    }

    firebase
      .firestore()
      .collection("users")
      .where("username", ">=", username)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        resolve(users);
      })
      .catch(() => reject());
  });

export const getUserById = (id) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.exists);
        resolve(snapshot.exists ? snapshot.data() : null);
      })
      .catch(() => reject());
  });

export const followUser = (user, currentUser) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("following")
      .doc(currentUser.id)
      .collection("userFollowing")
      .doc(user.id)
      .set({});

    sendNotification(
      user,
      "Signs of Humanity",
      `${currentUser.username}` + " followed you.",
      {
        type: "follow",
        user: currentUser,
      }
    );
  });

export const unfollowUser = (user, currentUser) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("following")
      .doc(currentUser.id)
      .collection("userFollowing")
      .doc(user.id)
      .delete();

    firebase
      .firestore()
      .collection("activities")
      .doc(user.id)
      .collection("notifications")
      .where("type", "==", "follow")
      .where("sender", "==", currentUser.id)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        }
      });
  });

export const getVoteById = (postId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("votes")
      .doc(uid)
      .get()
      .then((res) => {
        resolve(res.data());
      })
      .catch(() => reject());
  });

export const updateVote = (postId, uid, upvoted, downvoted) =>
  new Promise((resolve, reject) => {
    if (upvoted === false && downvoted === false) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("votes")
        .doc(uid)
        .delete();
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("votes")
        .doc(uid)
        .set({
          upvoted,
          downvoted,
        });
    }
  });

export const removeUpvoteNotification = (uid, currentUid, postId) =>
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

export const deleteComment = (postData, commentId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postData.id)
      .collection("comments")
      .doc(commentId)
      .delete();

    firebase
      .firestore()
      .collection("activities")
      .doc(postData.creator)
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

export const getPostById = (id) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.exists);
        resolve(snapshot.exists ? snapshot.data() : null);
      })
      .catch(() => reject());
  });
