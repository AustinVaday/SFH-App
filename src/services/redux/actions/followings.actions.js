import { firebase } from "../../../utils/firebase";
import { followingsAction } from "../constants";

export const fetchFollowings = () => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("follows")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowings")
        .onSnapshot((snapshot) => {
          let followings = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          console.log("following updateddddddd");
          dispatch({
            type: followingsAction.FETCH_CURRENT_USER_FOLLOWINGS_SUCCESS,
            followings,
          });
        });
    } catch (error) {
      dispatch({
        type: followingsAction.FETCH_CURRENT_USER_FOLLOWINGS_FAILURE,
        error,
      });
    }
  });
