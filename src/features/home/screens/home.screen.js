import React from "react";
import { FlatList, Dimensions } from "react-native";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import styled from "styled-components/native";

import { PostCard } from "../components/post-card.components";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import user from "../../../utils/mock/users";

const PostsListScreen = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const PostCardContainer = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
`;

const { height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  return (
    <PostsListScreen>
      <FlatList
        data={user}
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
        renderItem={({ item }) => {
          return (
            <PostCardContainer>
              <PostCard
                user={item}
                onNavigate={navigation.navigate}
                paramsNavigation={navigation}
              />
            </PostCardContainer>
          );
        }}
        keyExtractor={(index) => index.name.toString()}
        showsVerticalScrollIndicator={false}
      />
    </PostsListScreen>
  );
};
