import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Image, Avatar, SearchBar } from "react-native-elements";
import Colors from "../constants/Colors";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import ShareButton from "../components/ShareButton";
import user from "../data/users";
import PostSettingButton from "../components/PostSettingButton";

const users = user;

export default class HomeScreen extends Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  _onPressViewPosting = () => {
    this.props.navigation.navigate("ViewPosting");
  };

  _onPressViewGuestProfile = () => {
    this.props.navigation.navigate("ViewGuestProfile");
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Avatar
            size="medium"
            rounded
            source={{ uri: item.avatar }}
            onPress={this._onPressViewGuestProfile}
          />
          <View>
            <TouchableOpacity onPress={this._onPressViewGuestProfile}>
            <Text style={styles.cardName}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>
          <PostSettingButton />
        </View>
        <View style={styles.cardPostContainer}>
          <Image
            source={{uri: item.url}}
            style={styles.cardPost}
          />
        </View>
        <Text style={styles.cardCaption}>{item.caption}</Text>
        <View style={{ flexDirection: "row" }}>
          <LikeButton users={item.likes} />
          <CommentButton users={item.numComments} navigation={this._onPressViewPosting} />
          <ShareButton users={item.url} />
        </View>
      </View>
    );
  };

  render() {
    const { search } = this.state;

    return (
      <SafeAreaView style={styles.screen}>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.text}>Feed</Text>
              <SearchBar
                placeholder="Search"
                onChangeText={this.updateSearch}
                value={search}
                lightTheme
                containerStyle={{
                  backgroundColor: "white",
                  borderBottomColor: "transparent",
                  borderTopColor: "transparent",
                  paddingBottom: 20,
                }}
                inputContainerStyle={{
                  backgroundColor: "#F6F6F6",
                  height: 60,
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
          }
          data={users}
          renderItem={this.renderItem}
          keyExtractor={(index) => index.name.toString()}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
  },
  text: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 50,
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    marginBottom: 20,
    //borderWidth: 1, //for test
    width: 370,
    height: "31%",
  },
  cardHeader: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: 'space-between'
  },
  cardPostContainer: {
    alignSelf: "center",
  },
  cardPost: {
    width: 360,
    height: 400,
    borderRadius: 30,
    //paddingHorizontal: 100,
  },
  cardName: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    paddingLeft: 15,
    //paddingBottom: 10,
  },
  cardDate: {
    fontFamily: "open-sans",
    paddingLeft: 18,
    paddingBottom: 10,
    color: "#989C98",
  },
  cardCaption: {
    fontFamily: "open-sans",
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 20,
    paddingTop: 15,
  },
});
