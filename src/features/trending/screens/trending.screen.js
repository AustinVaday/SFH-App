import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { SmallPostCard } from "../components/small-post-card.components";

import dataTrending from "../../../utils/mock/dataTrending";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  width: 100%;
`;

const VideoContainer = styled.View`
  padding-bottom: ${(props) => props.theme.space[2]};
  width: 50%;
`;

const VideosList = styled(FlatList)`
  padding: ${(props) => props.theme.space[1]};
`;

// to get the data in the order for the most views
const mostViewsData = dataTrending.sort((a, b) => b.views - a.views);

export const TrendingScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [videoLength, setVideoLength] = useState(10);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    makeRemoteRequest();
  }, []);

  const makeRemoteRequest = () => {
    const newData = mostViewsData;
    console.log(videoLength);
    try {
      setData(
        videoLength === 10
          ? newData.slice(0, videoLength)
          : [...data, ...newData.slice(videoLength - 10, videoLength)]
      );
      setError(null);
      setLoading(false);
      setRefreshing(false);
      // searchFilterFunction("");
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = dataTrending.filter((item) => {
        const itemData = `${item.videoTitle.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setInputSearch(text);
      setData(newData);
    } else {
      setData(data);
      setInputSearch(text);
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

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar
          placeholder="Search for a signing"
          icon="card-search-outline"
          value={inputSearch}
          onChangeText={(text) => searchFilterFunction(text)}
        />
      </SearchContainer>
      <VideosList
        data={data}
        renderItem={({ item }) => {
          return (
            <VideoContainer>
              <SmallPostCard user={item} onNavigate={navigation.navigate} />
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
    </SafeArea>
  );
};
