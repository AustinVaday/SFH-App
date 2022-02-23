import React, { useState, useCallback, useRef, useEffect } from "react";
import { FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { PostCard } from "../components/post-card.components";
import { PostLoader } from "../components/post-loader.components";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../../services/redux/actions/posts.actions";
import { setNotificationService } from "../../../services/redux/actions/notifications.actions";
import { fetchFollowings } from "../../../services/redux/actions/followings.actions";

import {
  FeedBackground,
  ListEmptyBackground,
  ListEmptyContainer,
  PostsEmptyImage,
  PostCardContainer,
} from "./styles/feed.styles";

export const FeedScreen = () => {
  const WINDOW_HEIGHT = useSafeAreaFrame().height;
  const BOTTOM_BAR_HEIGHT = useBottomTabBarHeight();
  const HEADER_HEIGHT = useHeaderHeight();
  const DEFAULT_POST_SCREEN =
    WINDOW_HEIGHT - (HEADER_HEIGHT + BOTTOM_BAR_HEIGHT);

  const [loading, setLoading] = useState(true);

  // const currentUser = useSelector((state) => state.user.currentUser);
  const feed = useSelector((state) => state.posts.feed);

  const mediaRefs = useRef([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useeffect feed")
    dispatch(fetchFeed(setLoading));
    dispatch(setNotificationService());
    dispatch(fetchFollowings());
  }, []);

  const keyExtractor = useCallback((item, index) => `${item.id}`, []);

  const getItemLayout = (data, index) => {
    return {
      length: DEFAULT_POST_SCREEN,
      offset: DEFAULT_POST_SCREEN * index,
      index,
    };
  };

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <ListEmptyContainer>
          <PostsEmptyImage
            source={require("../../../assets/images/empty-posts.png")}
          />
          <Text variant="list_empty_title">Posts Are Empty</Text>
        </ListEmptyContainer>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <PostCardContainer style={{ height: DEFAULT_POST_SCREEN }}>
        <PostCard
          post={item}
          ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
        />
      </PostCardContainer>
    );
  };

  return (
    <FeedBackground>
      {loading ? (
        <PostLoader />
      ) : (
        <FlatList
          data={feed}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          ListEmptyComponent={listEmptyComponent}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          snapToInterval={DEFAULT_POST_SCREEN}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          disableIntervalMomentum
          initialNumToRender={0}
          windowSize={4}
          maxToRenderPerBatch={5}
          onScrollToIndexFailed={() => alert("no such index")}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={false}
          pagingEnabled={true}
          bounces={false}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
      <StatusBar style="auto" />
    </FeedBackground>
  );
};
