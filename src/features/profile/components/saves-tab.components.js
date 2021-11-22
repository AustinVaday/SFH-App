import React, { useState, useEffect } from "react";

import { Text } from "../../../components/typography/text.components";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

import {
  ListEmptyBackground,
  SavesList,
  PostThumbnail,
  PostContainer,
  BottomSection,
  PostBackground,
} from "../styles/saves-tab.styles";

export const SavesTab = ({ route, navigation }) => {
  const { uid } = route.params;
  const [userPosts, setUserPosts] = useState([]);

  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (uid === firebase.auth().currentUser.uid) {
        setUserPosts(currentUserPosts);
      } else {
        firebase
          .firestore()
          .collection("posts")
          .where("creator", "==", uid)
          .orderBy("creation", "desc")
          .get()
          .then((snapshot) => {
            let posts = snapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
            });
            setUserPosts(posts);
          });
      }
    });
  }, [uid]);

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">Save the first video</Text>
        <Text variant="list_empty_message">
          Favorite any video you want to save and rewatch later. Saved videos
          will appear here.
        </Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <PostBackground>
        <PostContainer>
          <PostThumbnail
            source={{ uri: item.videoThumbnail }}
            onPress={() => console.log("click post")}
          />
          <BottomSection>
            <Text variant="profile_tab_post_title">{item.title}</Text>
          </BottomSection>
        </PostContainer>
      </PostBackground>
    );
  };

  return (
    <SavesList
      data={userPosts}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      listKey={(item) => item.id.toString()}
      numColumns={3}
    />
  );
};
