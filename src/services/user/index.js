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
    console.log(field);
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

export const followUser = (uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(uid)
      .set({});
  });

export const unfollowUser = (uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(uid)
      .delete();
  });

export const getVoteById = (postId, uid) =>
  new Promise((resolve, reject) => {
    console.log(postId)
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
    console.log(upvoted + " " + downvoted + " " + uid);
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
