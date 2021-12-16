import { firebase } from "../../../utils/firebase";
require("firebase/firebase-auth");
require("firebase/firestore");

import { saveMediaToStorage } from "../../../services/user/random";
import {
  CURRENT_USER_POSTS_UPDATE,
  POSTS_DISCOVER,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_STATE_CHANGE,
  USER_CHATS_STATE_CHANGE,
} from "../constants";

import uuid from "uuid-random";

export const createPost =
  (title, description, video, thumbnail) => (dispatch) =>
    new Promise((resolve, reject) => {
      let storagePostId = uuid();
      let allSavePromises = Promise.all([
        saveMediaToStorage(
          video,
          `post/${firebase.auth().currentUser.uid}/${storagePostId}/video`
        ),
        saveMediaToStorage(
          thumbnail,
          `post/${firebase.auth().currentUser.uid}/${storagePostId}/thumbnail`
        ),
      ]);

      allSavePromises
        .then((media) => {
          firebase
            .firestore()
            .collection("posts")
            .add({
              creator: firebase.auth().currentUser.uid,
              videoURL: media[0],
              videoThumbnail: media[1],
              title,
              description,
              votesCount: 0,
              commentsCount: 0,
              creation: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => reject());
    });

export const getPostsByUser =
  (uid = firebase.auth().currentUser.uid) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("posts")
        .where("creator", "==", uid)
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((u) => {
              const user = u.data();

              let posts = snapshot.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data, user };
              });

              dispatch({
                type: CURRENT_USER_POSTS_UPDATE,
                currentUserPosts: posts,
              });
            });
        });
    });

export const getPostsForDiscover = () => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("creation", "desc")
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        dispatch({
          type: POSTS_DISCOVER,
          discoverPosts: posts,
        });
      });
  });

export const fetchUserFollowing = () => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return { id };
        });

        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });

        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i].id));
        }
      });
  });

export const fetchUsersData = (uid) => (dispatch, getState) => {
  new Promise((resolve, reject) => {
    const found = getState().posts.users.some((el) => el.id === uid);
    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            // user.uid = snapshot.id;

            dispatch({ type: USERS_STATE_CHANGE, user });
          }
        });
    }
  });
};

export const fetchUserChats = () => (dispatch, getState) => {
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", firebase.auth().currentUser.uid)
      .orderBy("lastMessageTimestamp", "desc")
      .onSnapshot((snapshot) => {
        let chats = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        for (let i = 0; i < chats.length; i++) {
          console.log("chats loop");
          let otherUserId;
          if (chats[i].users[0] === firebase.auth().currentUser.uid) {
            otherUserId = chats[i].users[1];
          } else {
            otherUserId = chats[i].users[0];
          }
          const found = getState().posts.users.some(
            (el) => el.id === otherUserId
          );
          if (!found) {
            dispatch(fetchUsersData(otherUserId));
          }
        }

        dispatch({ type: USER_CHATS_STATE_CHANGE, chats });
      });
  });
};
