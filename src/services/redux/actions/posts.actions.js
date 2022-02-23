import { firebase } from "../../../utils/firebase";

import { postsAction } from "../constants";

export const fetchFeed = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .limit(3)
      .get()
      .then((res) => {
        let posts = res.docs.map((value) => {
          const id = value.id;
          const data = value.data();
          return { id, ...data };
        });
        dispatch({
          type: postsAction.FETCH_FEED_SUCCESS,
          posts,
        });
        setLoading(false);
      })
      .catch((error) => {
        dispatch({
          type: postsAction.FETCH_FEED_FAILURE,
          error,
        });
        setLoading(false);
      });
  });

export const fetchCurrentUserPosts = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("posts")
        .where("creator", "==", firebase.auth().currentUser.uid)
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          dispatch({
            type: postsAction.FETCH_CURRENT_USER_POSTS_SUCCESS,
            posts,
            fetched: true,
          });
          setLoading(false);
        });
    } catch (error) {
      dispatch({
        type: postsAction.FETCH_CURRENT_USER_POSTS_FAILURE,
        error,
      });
    }
  });

export const fetchDiscoverPosts = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
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
            type: postsAction.FETCH_DISCOVER_POSTS_SUCCESS,
            posts,
          });
          setLoading(false);
        });
    } catch (error) {
      dispatch({
        type: postsAction.FETCH_DISCOVER_POSTS_FAILURE,
        error,
      });
      setLoading(false);
    }
  });
