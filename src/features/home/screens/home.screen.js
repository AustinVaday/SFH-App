import React, { useCallback, useRef } from "react";
import { FlatList, Dimensions, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";

import { HomePostCard } from "../components/home-post-card.components";
import { Text } from "../../../components/typography/text.components";

import { useSelector } from "react-redux";

import {
  HomeBackground,
  ListEmptyBackground,
  PostsEmptyImage
} from "../styles/home.styles";

const { height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.currentUserPosts);

  const mediaRefs = useRef([])

  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  const keyExtractor = useCallback((item, index) => `${item.id}`, []);

  const getItemLayout = useCallback((data, index) => {
    return {
      length: height - (tabBarHeight + headerHeight),
      offset: (height - (tabBarHeight + headerHeight)) * index,
      index,
    };
  }, []);

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
        <PostsEmptyImage source={require('../../../assets/images/empty-posts.png')} />
        <Text variant="list_empty_title">Posts Are Empty</Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, height: height - (tabBarHeight + headerHeight) }}>
        <HomePostCard post={item} user={item.user} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
      </View>
    );
  };

  return (
    <HomeBackground>
      <FlatList
        data={posts}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={height - (tabBarHeight + headerHeight)}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        disableIntervalMomentum
        initialNumToRender={0}
        windowSize={4}
        maxToRenderPerBatch={5}
        // initialNumToRender={10}
        // windowSize={5}
        // maxToRenderPerBatch={2}
        onScrollToIndexFailed={() => alert("no such index")}
        // updateCellsBatchingPeriod={50}
        removeClippedSubviews={false}
        pagingEnabled={true}
        bounces={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </HomeBackground>
  );
};
