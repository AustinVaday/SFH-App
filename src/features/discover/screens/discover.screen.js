import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BigList from "react-native-big-list";

import { Text } from "../../../components/typography/text.components";
import { SmallPost } from "../components/small-post.components";
import { DiscoverListLoader } from "../components/discover-list-loader.components";

import { useSelector, useDispatch } from "react-redux";
import { fetchDiscoverPosts } from "../../../services/redux/actions/posts.actions";
import { queryUsersAndKeywords } from "../../../services/firebase/users";

import {
  DiscoverBackground,
  ModalScreen,
  UserRow,
  PostTitleRow,
  SearchIcon,
  ArrowForwardIcon,
  UserImage,
  Searchbar,
} from "./styles/discover.styles";

export const DiscoverScreen = ({ navigation }) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState([]);
  const [videoLength, setVideoLength] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const discoverPosts = useSelector((state) => state.posts.discoverPosts);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchDiscoverPosts(setLoading));
  }, []);

  useEffect(() => {
    setFetching(true);
    makeRemoteRequest();
  }, [discoverPosts]);

  const makeRemoteRequest = () => {
    const newData = discoverPosts;
    try {
      setData(
        videoLength === 10
          ? newData.slice(0, videoLength)
          : [...data, ...newData.slice(videoLength - 10, videoLength)]
      );
      setFetching(false);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  const handleOnEndReached = () => {
    if (textInput.length === 0 && !fetching) {
      const increaseLength = videoLength + 10;
      setVideoLength(increaseLength);
      makeRemoteRequest();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setVideoLength(10);
    makeRemoteRequest();
  };

  const listHeaderComponent = () => {
    return <Text variant="discover_list_title">Recent Videos</Text>;
  };

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
          navigation.navigate("ResultsSearch", {
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
    <DiscoverBackground style={{ paddingTop: insets.top }}>
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

      {loading ? (
        <DiscoverListLoader />
      ) : (
        <FlatList
          data={data}
          renderItem={renderVideoThumbnailItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReachedThreshold={0.01}
          onEndReached={handleOnEndReached}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListHeaderComponent={listHeaderComponent}
        />
      )}

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
    </DiscoverBackground>
  );
};
