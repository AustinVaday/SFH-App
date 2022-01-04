import React, { useState, useEffect } from "react";

import { Text } from "../../../components/typography/text.components";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

import {
  ListEmptyBackground,
  PostsList,
  PostThumbnail,
  PostContainer,
  BottomSection,
  PostBackground,
} from "../styles/posts-tab.styles";

export const PostsTab = ({ route }) => {
  const { user } = route.params;

  const [userPosts, setUserPosts] = useState([]);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);

  console.log("poststab before useeffect")
  useEffect(() => {
    console.log("rerun posts")
    if (user.id === currentUser.id) {
      setUserPosts(currentUserPosts);
    } else {
      console.log("call firebase posts")
      firebase
        .firestore()
        .collection("posts")
        .where("creator", "==", user.id)
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
  }, []);

  console.log("poststab after useeffect")

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">Post your first video</Text>
        <Text variant="list_empty_message">
          Record or upload a video. Your videos will appear here.
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
    <PostsList
      data={userPosts}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      listKey={(item) => item.id.toString()}
      numColumns={3}
    />
  );
};
