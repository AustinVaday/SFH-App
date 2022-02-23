import { firebase } from "../../../utils/firebase";
import { deleteCommentNotification } from "../notifications";

import uuid from "uuid-random";
require("firebase/firebase-storage");

export const createPost = (title, description, video, thumbnail) =>
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

export const saveMediaToStorage = (media, path) =>
  new Promise((resolve, reject) => {
    const fileRef = firebase.storage().ref().child(path);

    fetch(media)
      .then((response) => response.blob())
      .then((blob) => fileRef.put(blob))
      .then((task) => task.ref.getDownloadURL())
      .then((downloadUrl) => resolve(downloadUrl))
      .catch(() => reject());
  });

export const getVoteByUserId = (postId, uid) =>
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

export const updateVote = (postId, userId, upvoted, downvoted) =>
  new Promise((resolve, reject) => {
    if (upvoted === false && downvoted === false) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("votes")
        .doc(userId)
        .delete();
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("votes")
        .doc(userId)
        .set({
          upvoted,
          downvoted,
        });
    }
  });

export const getPostByUserId = (userId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .get()
      .then((snapshot) => {
        console.log(snapshot.exists);
        resolve(snapshot.exists ? snapshot.data() : null);
      })
      .catch(() => reject());
  });

export const queryPostsByPostTitle = (title) =>
  new Promise((resolve, reject) => {
    if (title === "") {
      resolve([]);
    }

    firebase
      .firestore()
      .collection("posts")
      .where("title", "==", title)
      .limit(10)
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        resolve(posts);
      })
      .catch(() => reject());
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

    deleteCommentNotification(postData.creator, commentId);
  });

export const deletePost = (postId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => resolve())
      .catch(() => reject());
  });
