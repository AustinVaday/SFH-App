import React, { useState, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { SearchBar } from "react-native-elements";
import { queryUsersByUsername } from "../../../services/user";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { SmallPostCard } from "../components/small-post-card.components";
import { useSelector } from "react-redux";

const TrendingScreenContainer = styled.View`
  position: relative;
`;

const SearchScreenContainer = styled.View`
  position: absolute;
  background-color: white;
  left: 0px;
  z-index: 9999;
`;

const UserRowCard = styled(TouchableOpacity)`
  flex: 1;
  background-color: white;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled(Image)`
  background-color: gray;
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const VideoContainer = styled.View`
  padding: 2px;
  width: 50%;
`;

const { height, width } = Dimensions.get("window");

export const TrendingScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [videoLength, setVideoLength] = useState(10);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  const [textInputFocussed, setTextInputFocussed] = useState(false);

  const trendingPosts = useSelector((state) => state.posts.trendingPosts);

  useEffect(() => {
    setLoading(true);
    makeRemoteRequest();
  }, []);

  const makeRemoteRequest = () => {
    const newData = trendingPosts;
    try {
      setData(
        videoLength === 10
          ? newData.slice(0, videoLength)
          : [...data, ...newData.slice(videoLength - 10, videoLength)]
      );
      setError(null);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleOnEndReached = () => {
    if (inputSearch.length === 0 && !loading) {
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

  const [searchUsers, setSearchUsers] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    queryUsersByUsername(textInput).then(setSearchUsers);
  }, [textInput]);

  return (
    <SafeArea>
      <TrendingScreenContainer>
        <SearchBar
          placeholder="Search"
          containerStyle={{
            backgroundColor: "white",
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          inputContainerStyle={{ backgroundColor: "#E5E4E9" }}
          value={textInput}
          onChangeText={setTextInput}
          onFocus={() => setTextInputFocussed(true)}
          platform="ios"
          onCancel={() => setTextInputFocussed(false)}
          showCancel={textInputFocussed}
        />
        {textInputFocussed && (
          <SearchScreenContainer
            style={{
              top: StatusBar.currentHeight + 65,
              width: width,
              height: height,
            }}
          >
            <FlatList
              data={searchUsers}
              renderItem={({ item }) => {
                return (
                  <UserRowCard onPress={() => console.log("clicked")}>
                    <Text variant="search_username">{item.username}</Text>
                    <UserImage source={{ uri: item.profilePhoto }} />
                  </UserRowCard>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
            />
          </SearchScreenContainer>
        )}
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <VideoContainer>
                <SmallPostCard user={item} />
              </VideoContainer>
            );
          }}
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
      </TrendingScreenContainer>
    </SafeArea>
  );
};
