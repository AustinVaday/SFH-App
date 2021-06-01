import React from "react";
import {
  View,
  StyleSheet,
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
import { Text } from "../components/typography/text.components";
import { SafeArea } from "../components/utilities/safe-area.components"
import styled from "styled-components/native";

const ScreenTitle = styled(Text)`
  text-align: center;
`;

const PostsListArea = styled(SafeArea)`
  justify-content: center;
  align-items: center;
`;

const users = user;

export const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Avatar
            size="medium"
            rounded
            source={{ uri: item.avatar }}
            onPress={() => {
              navigation.navigate("ViewGuestProfile");
            }}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ViewGuestProfile");
              }}
            >
              {/* style={styles.cardName} */}
              <Text>{item.name}</Text>
            </TouchableOpacity>
            {/* style={styles.cardDate} */}
            <Text>{item.date}</Text>
          </View>
          <PostSettingButton />
        </View>
        <View style={styles.cardPostContainer}>
          <Image source={{ uri: item.url }} style={styles.cardPost} />
        </View>
        {/* style={styles.cardVideoTitle} */}
        <Text>{item.videoTitle}</Text>
        {/* style={styles.cardCaption} */}
        <Text>{item.caption}</Text>
        <View style={{ flexDirection: "row" }}>
          <LikeButton users={item.likes} />
          <CommentButton
            users={item.numComments}
            navigation={() => {
              navigation.navigate("ViewPosting");
            }}
          />
          <ShareButton users={item.url} />
        </View>
      </View>
    );
  };

  return (
    <PostsListArea>
      <FlatList
        ListHeaderComponent={
          <>
            <ScreenTitle variant="screen_title">Explore</ScreenTitle>
          </>
        }
        data={users}
        renderItem={renderItem}
        keyExtractor={(index) => index.name.toString()}
        showsVerticalScrollIndicator={false}
      />
    </PostsListArea>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 20,
    paddingLeft: 15,
  },
  cardDate: {
    paddingLeft: 18,
    paddingBottom: 10,
    color: "#989C98",
  },
  cardCaption: {
    fontSize: 15,
    paddingLeft: 8,
    paddingBottom: 20,
    paddingTop: 7,
  },
  cardVideoTitle: {
    fontSize: 30,
    paddingLeft: 5,
    paddingTop: 7,
  },
});
