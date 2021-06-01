import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { Image, SearchBar } from "react-native-elements";
import { BallIndicator } from "react-native-indicators";
import { Button } from "react-native-paper";
import dataTrending from "../data/dataTrending";

const { width } = Dimensions.get("window");

// to get the data in the order for the most views
const mostViewsData = dataTrending.sort((a, b) => b.views - a.views);

export const TrendingScreen = () => {
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

  const renderFooter = () => {
    if (loading && videoLength !== 0) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator animating size={"large"} />
        </View>
      );
    }
    return null;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setVideoLength(10);
    makeRemoteRequest();
  };

  const _goToViewPosting = async () => {
    const {
      navigation: { navigate },
    } = props;
    navigate("ViewPosting");
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={{ width: width / 2, height: width / 2 }}>
        <View style={styles.imageContainer}>
          <TouchableOpacity key={item} onPress={_goToViewPosting}>
            <Image
              PlaceholderContent={<BallIndicator color={Colors.primaryColor} />}
              source={{ uri: item.url }}
              style={styles.imageStyle}
            />
            <View
              style={{
                position: "absolute",
                width: 140,
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Button
                mode="contained"
                uppercase={false}
                style={{
                  opacity: 0.9,
                  marginTop: 160,
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 10,
                }}
              >
                {item.videoTitle}
              </Button>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.titleText}>Trending</Text>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => searchFilterFunction(text)}
            value={inputSearch}
            lightTheme
            containerStyle={{
              backgroundColor: "white",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              paddingBottom: 10,
            }}
            inputContainerStyle={{
              backgroundColor: "#F6F6F6",
              height: 60,
              width: width / 1.05,
              borderRadius: 30,
            }}
            searchIcon={{
              size: 35,
            }}
            inputStyle={{
              fontSize: 20,
            }}
          />
        }
        ListFooterComponent={renderFooter}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
  },
  titleText: {
    textAlign: "center",
    fontSize: 50,
    paddingBottom: 10,
  },
  imageStyle: {
    height: "100%",
    borderRadius: 30,
  },
  imageContainer: {
    marginVertical: 4,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
