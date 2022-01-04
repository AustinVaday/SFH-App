import React, { useState, useEffect } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

import { Text } from "../../../components/typography/text.components";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";
import { getPostById } from "../../../services/user";

import {
  ListEmptyBackground,
  SavesList,
  PostThumbnail,
  PostContainer,
  BottomSection,
  PostBackground,
} from "../styles/saves-tab.styles";

export const SavesTab = ({ route }) => {
  const { user } = route.params;

  const [userSaves, setUserSaves] = useState({ saves: [], loading: true });

  const currentUser = useSelector((state) => state.auth.currentUser);
  const saves = useSelector((state) => state.posts.saves);

  useEffect(() => {
    if (user.id === currentUser.id) {
      let posts = saves.map((save) => {
        let post = getPostById(save.postId);
        return post;
      });
      Promise.all(posts).then((postsResults) => {
        setUserSaves({ saves: postsResults, loading: false });
      });
    } else {
      if (!user.savesPrivate) {
        let saves = firebase
          .firestore()
          .collection("users")
          .doc(user.id)
          .collection("saves")
          .orderBy("creation", "desc")
          .get()
          .then((snapshot) => {
            let saves = snapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
            });
            return saves;
          });

        let posts = saves.map((save) => {
          let post = getPostById(save.postId);
          return post;
        });

        Promise.all(posts).then((postsResults) => {
          setUserSaves({ saves: postsResults, loading: false });
        });
      } else {
        setUserSaves({ loading: false });
      }
    }
  }, [saves]);

  if (userSaves.loading) {
    return (
      <ContentLoader
        viewBox="0 0 260 230"
        style={{
          height: 350,
          backgroundColor: "white",
        }}
      >
        <Rect x="1" y="0" rx="0" ry="0" width="85" height="110" />
        <Rect x="88" y="0" rx="0" ry="0" width="85" height="110" />
        <Rect x="174" y="0" rx="0" ry="0" width="85" height="110" />
        <Rect x="1" y="111" rx="0" ry="0" width="85" height="110" />
        <Rect x="88" y="111" rx="0" ry="0" width="85" height="110" />
        <Rect x="174" y="111" rx="0" ry="0" width="85" height="110" />
      </ContentLoader>
    );
  }

  if (user.id !== currentUser.id && user.savesPrivate) {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">
          This user's saved videos are private
        </Text>
      </ListEmptyBackground>
    );
  }

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

  const renderItem = ({ item: post }) => {
    return (
      <PostBackground>
        <PostContainer>
          <PostThumbnail
            source={{ uri: post.videoThumbnail }}
            onPress={() => console.log("click post")}
          />
          <BottomSection>
            <Text variant="profile_tab_post_title">{post.title}</Text>
          </BottomSection>
        </PostContainer>
      </PostBackground>
    );
  };

  return (
    <SavesList
      data={userSaves.saves}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={(item) => item.title?.toString()}
      listKey={(item) => item.title?.toString()}
      numColumns={3}
    />
  );
};
