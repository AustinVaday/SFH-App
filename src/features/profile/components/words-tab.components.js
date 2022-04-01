import React, { useState, useEffect } from "react";
import { Tabs } from "react-native-collapsible-tab-view";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { WordsListLoader } from "./words-list-loader.components";

import { firebase } from "../../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserWords } from "../../../services/redux/actions/words.actions";

import {
  ListEmptyBackground,
  WordThumbnail,
  WordContainer,
  BottomBarContainer,
  WordBackground,
} from "./styles/words-tab.styles";

export const WordsTab = ({ user, isOtherUser, navigation }) => {
  const [userWords, setUserWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserWords = useSelector((state) => state.words.currentUserWords);
  const fetched = useSelector((state) => state.words.isCurrentUserWordsFetched);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOtherUser && !fetched) {
      dispatch(fetchCurrentUserWords(setLoading));
    } else if (!isOtherUser) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOtherUser) {
      firebase
        .firestore()
        .collection("words")
        .where("creator", "==", user.id)
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) => {
          let words = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserWords(words);
          setLoading(false);
        });
    }
  }, []);

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Words</Text>
        <Spacer size="large" />
        {isOtherUser ? (
          <Text variant="list_empty_message">
            When they upload a word, the videos will appear here.
          </Text>
        ) : (
          <Text variant="list_empty_message">
            Record or upload a video. Your videos will appear here.
          </Text>
        )}
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item: word }) => {
    return (
      <WordBackground>
        <WordContainer>
          <WordThumbnail
            source={{ uri: word.videoThumbnail }}
            onPress={() => navigation.push("ViewWord", { word })}
          />
          <BottomBarContainer>
            <Text variant="profile_tab_word_title">{word.title}</Text>
          </BottomBarContainer>
        </WordContainer>
      </WordBackground>
    );
  };

  return (
    <>
      {loading ? (
        <WordsListLoader />
      ) : (
        <Tabs.FlatList
          data={isOtherUser ? userWords : currentUserWords}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
