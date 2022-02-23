import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BigList from "react-native-big-list";

import { Text } from "../../../../components/typography/text.components";
import { SmallPost } from "../../components/small-post.components";

import { useSelector } from "react-redux";
import { queryUsersAndKeywords } from "../../../../services/firebase/users";
import { queryPostsByPostTitle } from "../../../../services/firebase/posts";

import {
  ResultsSearchBackground,
  ModalScreen,
  BackIcon,
  UserRow,
  PostTitleRow,
  SearchIcon,
  ArrowForwardIcon,
  UserImage,
  Searchbar,
  SearchBarContainer,
} from "./styles/results-search.styles";

export const ResultsSearchScreen = ({ navigation, route }) => {
  const { keyword } = route.params;

  const [data, setData] = useState([]);
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [textInput, setTextInput] = useState(keyword);
  const [searchTimer, setSearchTimer] = useState(null);

  const insets = useSafeAreaInsets();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    queryPostsByPostTitle(keyword).then(setData);
  }, []);

  const renderSearchResultItem = ({ item }) => {
    return item.type === "user" ? (
      <UserRow
        onPress={() =>
          navigation.navigate("GuestProfile", {
            uid: item.id,
            isGuest: true,
            isOtherUser: currentUser.id !== item.id,
          })
        }
      >
        <Text variant="search_username">{item.username}</Text>
        <UserImage source={{ uri: item.profilePhoto }} />
      </UserRow>
    ) : (
      <PostTitleRow
        onPress={() =>
          navigation.replace("ResultsSearch", {
            keyword: item.title,
          })
        }
      >
        <Text variant="search_username">{item.title}</Text>
        <SearchIcon />
        <ArrowForwardIcon />
      </PostTitleRow>
    );
  };

  const renderVideoThumbnailItem = ({ item }) => {
    return <SmallPost post={item} />;
  };

  return (
    <ResultsSearchBackground style={{ paddingTop: insets.top }}>
      <SearchBarContainer>
        <BackIcon onPress={() => navigation.goBack()} />
        <Searchbar
          value={textInput}
          onChangeText={(text) => {
            if (searchTimer) {
              clearTimeout(searchTimer);
            }
            setTextInput(text);
            setSearchTimer(
              setTimeout(() => {
                queryUsersAndKeywords(text).then(setSearchResults);
              }, 500)
            );
          }}
          onFocus={() => setTextInputFocussed(true)}
          platform="ios"
          onCancel={() => setTextInputFocussed(false)}
          showCancel={textInputFocussed}
        />
      </SearchBarContainer>

      <FlatList
        data={data}
        renderItem={renderVideoThumbnailItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // I comment this out because in case if there is lag while scrolling
        // uncomment this to fix it for control initial number
        // of items to render and max render per batch
        // initialNumToRender={10}
        // maxToRenderPerBatch={10}
      />

      <ModalScreen
        isVisible={textInputFocussed}
        hasBackdrop={false}
        coverScreen={false}
        animationInTiming={1}
        animationOutTiming={1}
        style={{ marginTop: insets.top + 55 }}
      >
        <BigList
          data={searchResults}
          renderItem={renderSearchResultItem}
          keyExtractor={(item) => item.id}
          itemHeight={60}
        />
      </ModalScreen>
    </ResultsSearchBackground>
  );
};
