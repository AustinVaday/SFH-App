import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";

import uuid from "uuid-random";
require("firebase/firebase-storage");

export const createWord = (title, description, video, thumbnail) =>
  new Promise((resolve, reject) => {
    let storageWordId = uuid();
    let allSavePromises = Promise.all([
      saveMediaToStorage(
        video,
        `word/${firebase.auth().currentUser.uid}/${storageWordId}/video`
      ),
      saveMediaToStorage(
        thumbnail,
        `word/${firebase.auth().currentUser.uid}/${storageWordId}/thumbnail`
      ),
    ]);

    allSavePromises
      .then((media) => {
        firebase
          .firestore()
          .collection("words")
          .add({
            creator: firebase.auth().currentUser.uid,
            // videoURL: media[0],
            videoURL:
              "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4",
            // videoThumbnail: media[1],
            videoThumbnail:
              "https://images.all-free-download.com/images/graphicwebp/cold_conifer_fall_forest_frost_frozen_ice_landscape_599685.webp",
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

export const getWordVoteByUserId = (wordId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .doc(wordId)
      .collection("votes")
      .doc(uid)
      .get()
      .then((res) => {
        resolve(res.data());
      })
      .catch(() => reject());
  });

export const updateWordVote = (wordId, userId, upvoted, downvoted) =>
  new Promise((resolve, reject) => {
    if (upvoted === false && downvoted === false) {
      firebase
        .firestore()
        .collection("words")
        .doc(wordId)
        .collection("votes")
        .doc(userId)
        .delete();
    } else {
      firebase
        .firestore()
        .collection("words")
        .doc(wordId)
        .collection("votes")
        .doc(userId)
        .set({
          upvoted,
          downvoted,
        });
    }
  });

export const getWordByUserId = (userId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .doc(userId)
      .get()
      .then((snapshot) => {
        console.log(snapshot.exists);
        resolve(snapshot.exists ? snapshot.data() : null);
      })
      .catch(() => reject());
  });

export const queryWordsByWordTitle = (title) =>
  new Promise((resolve, reject) => {
    if (title === "") {
      resolve([]);
    }

    firebase
      .firestore()
      .collection("words")
      .where("title", "==", title)
      .limit(10)
      .get()
      .then((snapshot) => {
        let words = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        resolve(words);
      })
      .catch(() => reject());
  });

export const deleteWord = (wordId, isViewWord, navigation) =>
  new Promise((resolve, reject) => {
    const commentsRef = firebase
      .firestore()
      .collection("words")
      .doc(wordId)
      .collection("comments");

    commentsRef.onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          let votesFromCommentRef = firebase
            .firestore()
            .collection("words")
            .doc(wordId)
            .collection("comments")
            .doc(doc.id)
            .collection("votes");

          votesFromCommentRef.onSnapshot((voteSnapshot) => {
            if (!voteSnapshot.empty) {
              voteSnapshot.docs.forEach((voteDoc) => {
                votesFromCommentRef.doc(voteDoc.id).delete();
              });
            }
          });

          commentsRef.doc(doc.id).delete();
        });
      }
    });

    const votesRef = firebase
      .firestore()
      .collection("words")
      .doc(wordId)
      .collection("votes");

    votesRef.onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          votesRef.doc(doc.id).delete();
        });
      }
    });

    firebase
      .firestore()
      .collection("words")
      .doc(wordId)
      .delete()
      .then(() => {
        if (isViewWord) {
          navigation.goBack();
        }

        Toast.show({
          type: "infoMessage",
          props: {
            message: "You have deleted your word.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
        resolve();
      })
      .catch(() => {
        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to delete your word. Try again later.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
        reject();
      });
  });
