import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { PostCard } from "../components/post-card.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import user from "../../../utils/mock/users";

const PostsListArea = styled(SafeArea)`
  background-color: #f8f9fa;
  justify-content: center;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <PostsListArea>
      <FlatList
        data={user}
        renderItem={({ item }) => {
          return (
            <Spacer size="large">
              <PostCard
                user={item}
                onNavigate={navigation.navigate}
                paramsNavigation={navigation}
              />
            </Spacer>
          );
        }}
        keyExtractor={(index) => index.name.toString()}
        showsVerticalScrollIndicator={false}
      />
    </PostsListArea>
  );
};
