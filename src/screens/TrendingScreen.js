import React, { Component } from "react";
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
import { SearchBar } from "react-native-elements";
import Colors from "../constants/Colors";
import { Image } from "react-native-elements";
import { BallIndicator } from "react-native-indicators";
import { Button } from "react-native-paper";
import dataTrending from "../data/dataTrending";

const { width } = Dimensions.get("window");

export default class TrendingScreen extends Component {
  state = {
    loading: false,
    data: [],
    length: 10,
    error: false,
    refreshing: false,
    filteredData: [],
  };

  inputSearch = "";

  componentDidMount() {
    this.setState({ loading: true }, () => this.makeRemoteRequest());
  }

  makeRemoteRequest = () => {
    const { length } = this.state;
    const newData = dataTrending;
    console.log(length);
    try {
      this.setState(
        {
          data:
            length === 10
              ? newData.slice(0, length)
              : [...this.state.data, ...newData.slice(length - 10, length)],
          error: null,
          loading: false,
          refreshing: false,
        },
        () => this.searchFilterFunction("")
      );
    } catch (error) {
      console.log(error);
      this.setState({ error, loading: false });
    }
  };

  searchFilterFunction = (text) => {
    this.inputSearch = text;
    const newData = this.state.data.filter((item) => {
      const itemData = `${item.videoTitle.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ filteredData: newData });
  };

  handleOnEndReached = (info) => {
    console.log(info.distanceFromEnd);
    if (info.distanceFromEnd >= -10) {
      this.inputSearch.length === 0 &&
        !this.state.loading &&
        this.setState(
          (state, props) => {
            return { loading: true, length: state.length + 10 };
          },
          () => this.makeRemoteRequest()
        );
    }
  };

  renderHeader = () => {
    return (
      <>
        <Text style={styles.titleText}>Trending</Text>
        <SearchBar
          placeholder="Search"
          onChangeText={(text) => this.searchFilterFunction(text)}
          value={this.inputSearch}
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
            fontFamily: "open-sans",
          }}
        />
      </>
    );
  };

  renderFooter = () => {
    console.log(this.state.loading);
    if (this.state.loading && this.state.length !== 0) {
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

  handleRefresh = () => {
    this.setState({ refreshing: true, length: 10 }, () =>
      this.makeRemoteRequest()
    );
  };

  _renderItem = ({ item }) => (
    <>
      <View style={{ width: width / 2, height: width / 2 }}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            key={item}
            onPress={this.props.navigationViewPosting}
          >
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
    </>
  );

  render() {
    const { search } = this.state;

    return (
      <SafeAreaView style={styles.screen}>
        <FlatList
          data={this.state.filteredData}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.url}
          numColumns={2}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={this.handleOnEndReached}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          // I comment this out because in case if there is lag while scrolling
          // uncomment this to fix it for control initial number
          // of items to render and max render per batch
          // initialNumToRender={10}
          // maxToRenderPerBatch={10}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
  },
  titleText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
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
