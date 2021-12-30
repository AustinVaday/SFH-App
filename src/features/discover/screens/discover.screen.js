import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { queryUsersByUsername } from "../../../services/user";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { SmallPostCard } from "../components/small-post-card.components";

import { useSelector } from "react-redux";

import {
  DiscoverBackground,
  SearchScreen,
  UserRowCard,
  UserImage,
  VideoContainer,
  Searchbar,
} from "../styles/discover.styles";

export const DiscoverScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [videoLength, setVideoLength] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const [textInput, setTextInput] = useState("");

  const discoverPosts = useSelector((state) => state.posts.discoverPosts);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    setLoading(true);
    makeRemoteRequest();
  }, [discoverPosts]);

  useEffect(() => {
    queryUsersByUsername(textInput).then(setSearchUsers);
  }, [textInput]);

  const makeRemoteRequest = () => {
    const newData = discoverPosts;
    try {
      setData(
        videoLength === 10
          ? newData.slice(0, videoLength)
          : [...data, ...newData.slice(videoLength - 10, videoLength)]
      );
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleOnEndReached = () => {
    if (textInput.length === 0 && !loading) {
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

  const renderSearchUserItem = ({ item }) => {
    return (
      <UserRowCard
        onPress={() =>
          navigation.navigate("GuestProfile", {
            uid: item.id,
            guestUser: currentUser.id !== item.id,
          })
        }
      >
        <Text variant="search_username">{item.username}</Text>
        <UserImage source={{ uri: item.profilePhoto }} />
      </UserRowCard>
    );
  };

  const renderVideoThumbnailItem = ({ item }) => {
    return (
      <VideoContainer>
        <SmallPostCard post={item} />
      </VideoContainer>
    );
  };

  return (
    <SafeArea>
      <DiscoverBackground>
        <Searchbar
          value={textInput}
          onChangeText={setTextInput}
          onFocus={() => setTextInputFocussed(true)}
          platform="ios"
          onCancel={() => setTextInputFocussed(false)}
          showCancel={textInputFocussed}
        />
        {textInputFocussed && (
          <SearchScreen>
            <FlatList
              data={searchUsers}
              renderItem={renderSearchUserItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </SearchScreen>
        )}
        <FlatList
          data={data}
          renderItem={renderVideoThumbnailItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReachedThreshold={0.01}
          onEndReached={handleOnEndReached}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          // I comment this out because in case if there is lag while scrolling
          // uncomment this to fix it for control initial number
          // of items to render and max render per batch
          // initialNumToRender={10}
          // maxToRenderPerBatch={10}
        />
      </DiscoverBackground>
    </SafeArea>
  );
};
