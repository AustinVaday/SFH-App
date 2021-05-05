import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image, Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import ShareButton from "../components/ShareButton";
import user from "../data/users";
import PostSettingButton from "../components/PostSettingButton";

const users = user;

export default class HomeScreen extends Component {

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
          <Image source={{ uri: item.url }} style={styles.cardPost} />
        </View>
        <Text style={styles.cardVideoTitle}>{item.videoTitle}</Text>
        <Text style={styles.cardCaption}>{item.caption}</Text>
        <View style={{ flexDirection: "row" }}>
          <LikeButton users={item.likes} />
          <CommentButton
            users={item.numComments}
            navigation={this._onPressViewPosting}
          />
          <ShareButton users={item.url} />
        </View>
      </View>
    );
  };

  render() {

    return (
      <SafeAreaView style={styles.screen}>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.text}>Explore</Text>
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
    width: 370,
    height: "31%",
  },
  cardHeader: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  cardPostContainer: {
    alignSelf: "center",
  },
  cardPost: {
    width: 360,
    height: 400,
    borderRadius: 30,
  },
  cardName: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    paddingLeft: 15,
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
    paddingLeft: 8,
    paddingBottom: 20,
    paddingTop: 7,
  },
  cardVideoTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 30,
    paddingLeft: 5,
    paddingTop: 7,
  },
});
