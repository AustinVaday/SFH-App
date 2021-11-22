import React, { useCallback } from "react";
import { FlatList, Dimensions } from "react-native";

import { HomePostCard } from "../components/home-post-card.components";
import { Text } from "../../../components/typography/text.components";

import { useSelector } from "react-redux";

import {
  HomeBackground,
  ListEmptyBackground,
  Navbar,
  SFHLogoImage,
} from "../styles/home.styles";

const { height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.currentUserPosts);

  const renderItem = useCallback(({ item, index }) => {
    return <HomePostCard post={item} user={item.user} />;
  }, []);

  const keyExtractor = useCallback(
    (item, index) => `${item.id.toString()}`,
    []
  );

  const getItemLayout = useCallback((data, index) => {
    return { length: height, offset: height * index, index };
  }, []);

  const listEmptyComponent = useCallback(() => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Posts Here</Text>
        <Text variant="list_empty_message">
          Follow someone to see their latest posts here.
        </Text>
      </ListEmptyBackground>
    );
  }, []);

  return (
    <HomeBackground>
      <Navbar
        navigation={navigation}
        leftComponent={
          <SFHLogoImage
            source={require("../../../assets/icons/sfh-logo-nobg.png")}
          />
        }
        centerComponent={<Text variant="navbar_title">Explore</Text>}
      />
      <FlatList
        data={posts}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ListEmptyComponent={listEmptyComponent}
        // itemHeight={height / 1.26}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={height / 1.24}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        disableIntervalMomentum
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={false}
      />
    </HomeBackground>
  );
};
