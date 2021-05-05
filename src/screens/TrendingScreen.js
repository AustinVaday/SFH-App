import React, { Component } from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

export default class TrendingScreen extends Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.titleText}>Trending</Text>
        <SearchBar
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
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
            width: width / 1.1,
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
});
