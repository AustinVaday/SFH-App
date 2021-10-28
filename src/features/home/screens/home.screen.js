import React, { useCallback } from "react";
import { FlatList, Dimensions } from "react-native";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import BigList from "react-native-big-list";
import styled from "styled-components/native";

import { PostCard } from "../components/post-card.components";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { useSelector } from "react-redux";

const PostsListScreen = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const PostCardContainer = styled.View`
  justify-content: center;
  align-items: center;
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
      <PostCardContainer style={{ height: height / 1.24 }}>
        <PostCard
          post={item}
          user={item.user}
          onNavigate={navigation.navigate}
          paramsNavigation={navigation}
        />
      </PostCardContainer>
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
              <MCIcon
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
