import React, { useState, useEffect } from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { PostsListLoader } from "./posts-list-loader.components";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import { useDispatch, useSelector } from "react-redux";
import { fetchSaves } from "../../../services/redux/actions/saves.actions";

import {
  ListEmptyBackground,
  PrivateSavesBackground,
  PostThumbnail,
  PostContainer,
  BottomSection,
  PostBackground,
} from "./styles/saves-tab.styles";

export const SavesTab = ({ isOtherUser, navigation }) => {
  const [loading, setLoading] = useState(true);

  const saves = useSelector((state) => state.saves.currentUserSaves);
  const fetched = useSelector((state) => state.saves.isCurrentUserSavesFetched);

  const dispatch = useDispatch();

  console.log("savesTab");
  useEffect(() => {
    if (!isOtherUser && !fetched) {
      dispatch(fetchSaves(setLoading));
    } else if (!isOtherUser) {
      setLoading(false);
    }
  }, []);

  if (isOtherUser) {
    return (
      <Tabs.ScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <PrivateSavesBackground>
          <Text variant="private_saves_message">
            This user's saved videos are private
          </Text>
        </PrivateSavesBackground>
      </Tabs.ScrollView>
    );
  }

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Saves</Text>
        <Spacer size="large" />
        {isOtherUser ? (
          <Text variant="list_empty_message">
            When they save the video, the videos will appear here.
          </Text>
        ) : (
          <Text variant="list_empty_message">
            Save any video you want and re-watch here later. Saved videos will
            appear here.
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
          data={saves}
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
