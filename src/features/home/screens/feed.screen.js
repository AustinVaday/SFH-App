import React, { useState, useMemo, useRef, useEffect } from "react";
import { FlatList, Platform, RefreshControl } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

import { Card } from "../../app/components/card.components";
import { WordLoader } from "../components/word-loader.components";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeed,
  refreshFeed,
} from "../../../services/redux/actions/words.actions";
import { setNotificationService } from "../../../services/redux/actions/notifications.actions";
import { fetchFollowings } from "../../../services/redux/actions/followings.actions";

import {
  FeedBackground,
  ListEmptyBackground,
  CardContainer,
  RefreshLoadingIcon,
} from "./styles/feed.styles";

const REFRESHINGHEIGHT = 100;

export const FeedScreen = ({ navigation }) => {
  const WINDOW_HEIGHT = useSafeAreaFrame().height;
  const BOTTOM_BAR_HEIGHT = useBottomTabBarHeight();
  const HEADER_HEIGHT = useHeaderHeight();
  const DEFAULT_WORD_SCREEN =
    WINDOW_HEIGHT - (HEADER_HEIGHT + BOTTOM_BAR_HEIGHT);

  const [loading, setLoading] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [extraPaddingTop, setExtraPaddingTop] = useState(0);

  const feed = useSelector((state) => state.words.feed);

  const mediaRefs = useRef([]);
  const currentIndex = useRef(null);
  const lottieViewRef = useRef(null);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(fetchFeed(setLoading));
    dispatch(setNotificationService());
    dispatch(fetchFollowings());
  }, []);

  useEffect(() => {
    if (!isFocused) {
      let cell = mediaRefs.current[currentIndex.current?.key];

      if (cell) {
        cell.stop();
      }
    } else {
      let cell = mediaRefs.current[currentIndex.current?.key];

      if (cell) {
        cell.play();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (Platform.OS === "ios") {
      if (isRefreshing) {
        setExtraPaddingTop(75);
        lottieViewRef.current.play();
      } else {
        setExtraPaddingTop(0);
      }
    }
  }, [isRefreshing]);

  const keyExtractor = (item, index) => `${item.id}`;

  const snapToInterval = useMemo(() => DEFAULT_WORD_SCREEN, []);

  const getItemLayout = (data, index) => {
    return {
      length: DEFAULT_WORD_SCREEN,
      offset: DEFAULT_WORD_SCREEN * index,
      index,
    };
  };

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();

          currentIndex.current = element;
        } else {
          cell.stop();
        }
      }
    });
  });

  const onScroll = (event) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  };

  const onRelease = () => {
    if (offsetY <= -REFRESHINGHEIGHT && !isRefreshing) {
      onHandleRefresh();
    }
  };

  const onHandleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      dispatch(refreshFeed(setIsRefreshing));
    }, 2000);
  };

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Words</Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <CardContainer style={{ height: DEFAULT_WORD_SCREEN }}>
        <Card
          isViewWord={false}
          word={item}
          ref={(WordRef) => (mediaRefs.current[item.id] = WordRef)}
          navigation={navigation}
        />
      </CardContainer>
    );
  };

  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    progress = offsetY / -REFRESHINGHEIGHT;
  }

  return (
    <FeedBackground>
      {loading ? (
        <WordLoader />
      ) : (
        <>
          {Platform.OS === "ios" && (
            <RefreshLoadingIcon
              ref={lottieViewRef}
              style={{
                height: REFRESHINGHEIGHT,
              }}
              progress={progress}
              source={require("../../../assets/lottie/pull-refresh-loading.json")}
            />
          )}
          <FlatList
            data={feed}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            ListEmptyComponent={listEmptyComponent}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            snapToInterval={snapToInterval}
            snapToAlignment="center"
            decelerationRate="fast"
            disableIntervalMomentum={true}
            initialNumToRender={3}
            windowSize={5}
            maxToRenderPerBatch={3}
            updateCellsBatchingPeriod={50}
            removeClippedSubviews={false}
            pagingEnabled={true}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            onViewableItemsChanged={onViewableItemsChanged.current}
            onScroll={onScroll}
            onResponderRelease={onRelease}
            style={{ paddingTop: extraPaddingTop }}
            refreshControl={
              Platform.OS === "android" && (
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onHandleRefresh}
                />
              )
            }
            contentContainerStyle={
              feed.length === 0 && {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                flexGrow: 1,
              }
            }
          />
        </>
      )}
      <StatusBar style="auto" />
    </FeedBackground>
  );
};
