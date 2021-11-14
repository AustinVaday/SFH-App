import React, { useCallback } from "react";
import { FlatList, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { HomePostCard } from "../components/home-post-card.components";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { useSelector } from "react-redux";

const PostsListScreen = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
`;

const { height, width } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.currentUserPosts);

  const renderItem = useCallback(({ item, index }) => {
    return (
        <HomePostCard
          post={item}
          user={item.user}
          onNavigate={navigation.navigate}
          paramsNavigation={navigation}
        />
    );
  }, []);

  const keyExtractor = useCallback(
    (item, index) => `${item.id.toString()}`,
    []
  );

  const getItemLayout = useCallback((data, index) => {
    return { length: height, offset: height * index, index };
  }, []);

  return (
    <PostsListScreen>
      <FlatList
        data={posts}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ListEmptyComponent={() => {
          return (
            <ListEmptySection style={{ height: height / 2 }}>
              <MaterialCommunityIcons
                name={"post-outline"}
                size={120}
                color={colors.icon.secondary}
              />
              <Text
                variant="list_empty_title"
                style={{
                  paddingBottom: 20,
                  paddingTop: 20,
                }}
              >
                No Posts Here
              </Text>
              <Text variant="list_empty_message">
                Follow someone to see their latest posts here.
              </Text>
            </ListEmptySection>
          );
        }}
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
    </PostsListScreen>
  );
};
