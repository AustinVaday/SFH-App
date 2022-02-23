import { firebase } from "../../../utils/firebase";
import { followersAction } from "../constants";

export const fetchFollowers = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("follows")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowers")
        .onSnapshot((snapshot) => {
          let followers = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          console.log("following updateddddddd");
          dispatch({
            type: followersAction.FETCH_CURRENT_USER_FOLLOWERS_SUCCESS,
            followers,
            fetched: true,
          });
          setLoading(false);
        });
    } catch (error) {
      dispatch({
        type: followersAction.FETCH_CURRENT_USER_FOLLOWERS_FAILURE,
        error,
      });
      setLoading(false);
    }
  });
