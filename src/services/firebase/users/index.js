import { firebase } from "../../../utils/firebase";
import { saveMediaToStorage } from "../posts";

export const saveUserProfileImage = (image) =>
  new Promise((resolve, reject) => {
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
        .then(() => resolve())
        .catch(() => reject());
    });
  });

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

// export const queryUsersByUsername = (username) =>
//   new Promise((resolve, reject) => {
//     if (username === "") {
//       resolve([]);
//     }

//     firebase
//       .firestore()
//       .collection("users")
//       .where("username", ">=", username)
//       .where("username", "<=", username + "~")
//       .get()
//       .then((snapshot) => {
//         let users = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           const id = doc.id;
//           return { id, ...data };
//         });
//         resolve(users);
//       })
//       .catch(() => reject());
//   });

export const queryUsersAndKeywords = (keyword) =>
  new Promise((resolve, reject) => {
    if (keyword === "") {
      resolve([]);
    }

    firebase
      .firestore()
      .collection("users")
      .where("username", ">=", keyword)
      .where("username", "<=", keyword + "~")
      .limit(5)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, type: "user" };
        });

        firebase
          .firestore()
          .collection("posts")
          .where("title", ">=", keyword)
          .where("title", "<=", keyword + "~")
          .limit(5)
          .get()
          .then((snapshot) => {
            let titles = snapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data, type: "post" };
            });
            resolve([...users, ...titles]);
          })
          .catch(() => reject());
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
        const data = snapshot.data();
        const id = snapshot.id;
        console.log("getUserbyId " + snapshot.exists);
        resolve(snapshot.exists ? { id, ...data } : null);
      })
      .catch(() => reject());
  });
