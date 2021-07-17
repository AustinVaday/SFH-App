import React from "react";
import { FlatList, Image } from "react-native";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { PostCard } from "../components/post-card.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import user from "../../../utils/mock/users";

const TopHomeSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[2]};
`;

const ScreenTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h4};
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
            <Spacer position="bottom" size="small">
              <TopHomeSection>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={require("../../../assets/icons/sfh-logo-nobg.png")}
                />
                <ScreenTitle variant="title">Explore</ScreenTitle>
              </TopHomeSection>
            </Spacer>
          </>
        }
        data={user}
        renderItem={({ item }) => {
          return (
            <Spacer position="bottom" size="large">
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
