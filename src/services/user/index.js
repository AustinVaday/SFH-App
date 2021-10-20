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
