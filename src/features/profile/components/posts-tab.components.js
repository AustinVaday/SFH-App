import React, { useState, useEffect } from "react";
import { Tabs } from "react-native-collapsible-tab-view";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { PostsListLoader } from "./posts-list-loader.components";

import { firebase } from "../../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserPosts } from "../../../services/redux/actions/posts.actions";

import {
  ListEmptyBackground,
  PostThumbnail,
  PostContainer,
  BottomSection,
  PostBackground,
} from "./styles/posts-tab.styles";

export const PostsTab = ({ user, isOtherUser, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);
  const fetched = useSelector((state) => state.posts.isCurrentUserPostsFetched);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOtherUser && !fetched) {
      dispatch(fetchCurrentUserPosts(setLoading));
    } else if (!isOtherUser) {
      setLoading(false);
    }
  }, []);

  console.log("poststab before useeffect");
  useEffect(() => {
    console.log("rerun posts");
    if (isOtherUser) {
      console.log("call firebase posts");
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
          setLoading(false);
        });
    }
  }, []);

  console.log("poststab after useeffect");

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Posts</Text>
        <Spacer size="large" />
        {isOtherUser ? (
          <Text variant="list_empty_message">
            When they post, the videos will appear here.
          </Text>
        ) : (
          <Text variant="list_empty_message">
            Record or upload a video. Your videos will appear here.
          </Text>
        )}
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item: post }) => {
    return (
      <PostBackground>
        <PostContainer>
          <PostThumbnail
            source={{ uri: post.videoThumbnail }}
            onPress={() => navigation.navigate("ViewPost", { post })}
          />
          <BottomSection>
            <Text variant="profile_tab_post_title">{post.title}</Text>
          </BottomSection>
        </PostContainer>
      </PostBackground>
    );
  };

  return (
    <>
      {loading ? (
        <PostsListLoader />
      ) : (
        <Tabs.FlatList
          data={isOtherUser ? userPosts : currentUserPosts}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
