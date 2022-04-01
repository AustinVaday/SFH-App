import { firebase } from "../../../utils/firebase";

import { wordsAction } from "../constants";

export const fetchFeed = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .limit(5)
      .get()
      .then((snapshot) => {
        let words = snapshot.docs.map((value) => {
          const id = value.id;
          const data = value.data();
          return { id, ...data };
        });
        dispatch({
          type: wordsAction.FETCH_FEED_SUCCESS,
          words,
        });
        setLoading(false);
      })
      .catch((error) => {
        dispatch({
          type: wordsAction.FETCH_FEED_FAILURE,
          error,
        });
        setLoading(false);
      });
  });

export const refreshFeed = (setIsRefreshing) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .limit(5)
      .get()
      .then((snapshot) => {
        let words = snapshot.docs.map((value) => {
          const id = value.id;
          const data = value.data();
          return { id, ...data };
        });

        dispatch({
          type: wordsAction.FETCH_FEED_SUCCESS,
          words,
        });
        setIsRefreshing(false);
      })
      .catch((error) => {
        dispatch({
          type: wordsAction.FETCH_FEED_FAILURE,
          error,
        });
        setIsRefreshing(false);
      });
  });

export const fetchCurrentUserWords = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("words")
        .where("creator", "==", firebase.auth().currentUser.uid)
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          let words = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          dispatch({
            type: wordsAction.FETCH_CURRENT_USER_WORDS_SUCCESS,
            words,
            fetched: true,
          });
          setLoading(false);
        });
    } catch (error) {
      dispatch({
        type: wordsAction.FETCH_CURRENT_USER_WORDS_FAILURE,
        error,
      });
    }
  });

export const fetchDiscoverWords = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .orderBy("creation", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        let words = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        dispatch({
          type: wordsAction.FETCH_DISCOVER_WORDS_SUCCESS,
          words,
        });
        setLoading(false);
      })
      .catch((error) => {
        dispatch({
          type: wordsAction.FETCH_DISCOVER_WORDS_FAILURE,
          error,
        });
        setLoading(false);
      });
  });

export const refreshDiscoverWords = (setIsRefreshing) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("words")
      .orderBy("creation", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        let words = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        dispatch({
          type: wordsAction.FETCH_DISCOVER_WORDS_SUCCESS,
          words,
        });
        setIsRefreshing(false);
      })
      .catch((error) => {
        dispatch({
          type: wordsAction.FETCH_DISCOVER_WORDS_FAILURE,
          error,
        });
        setIsRefreshing(false);
      });
  });
