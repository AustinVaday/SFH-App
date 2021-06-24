import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { PostCard } from "../components/post-card.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import user from "../../../utils/mock/users";

const ScreenTitle = styled(Text)`
  text-align: center;
`;

const PostsListArea = styled(SafeArea)`
  background-color: #f8f9fa;
  justify-content: center;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <PostsListArea>
      <FlatList
        ListHeaderComponent={
          <>
            <Spacer position="bottom" size="large">
              <ScreenTitle variant="screen_title">Explore</ScreenTitle>
            </Spacer>
          </>
        }
        data={user}
        renderItem={({ item }) => {
          return (
            <Spacer position="bottom" size="large">
              <PostCard user={item} onNavigate={navigation.navigate} paramsNavigation={navigation} />
            </Spacer>
          );
        }}
        keyExtractor={(index) => index.name.toString()}
        showsVerticalScrollIndicator={false}
      />
    </PostsListArea>
  );
};
