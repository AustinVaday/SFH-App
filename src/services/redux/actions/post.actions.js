import { firebase } from "../../../utils/firebase";
require("firebase/firebase-auth");
require("firebase/firestore");

import { saveMediaToStorage } from "../../../services/user/random";
import {
  CURRENT_USER_POSTS_UPDATE,
  POSTS_TRENDING,
  USER_FOLLOWING_STATE_CHANGE,
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
              likesCount: 0,
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

export const getPostsForTrending = () => (dispatch) =>
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
          type: POSTS_TRENDING,
          trendingPosts: posts,
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
          return id;
        });
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
        // for (let i = 0; i < following.length; i++) {
        //   dispatch(fetchUsersData(following[i], true));
        // }
      });
  });
