import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Avatar, Card, TouchableRipple } from "react-native-paper";

import { Text } from "../../../components/typography/text.components";

const CardContainer = styled(Card)`
  width: 95%;
  align-self: center;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

const AvatarIcon = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const VideoContainer = styled.View`
  padding-bottom: ${(props) => props.theme.space[2]};
  width: 50%;
`;

const LikesList = styled(FlatList)`
  padding: ${(props) => props.theme.space[2]};
  background-color: #f8f9fa;
`;

export const LikesTab = ({ route, navigation }) => {
  const { newitem } = route.params;
  return (
    <LikesList
      data={newitem.likes}
      renderItem={({ item }) => {
        return (
          <VideoContainer>
            <CardContainer elevation={2}>
              <TouchableRipple
                onPress={() => {
                  navigation.navigate("ViewPosting");
                }}
              >
                <Card.Cover source={{ uri: item.url }} />
              </TouchableRipple>
              <BottomCard>
                <Text variant="small_title">{item.videoTitle}</Text>
                <AvatarIcon>
                  <Avatar.Image size={34} source={{ uri: item.avatar }} />
                </AvatarIcon>
              </BottomCard>
            </CardContainer>
          </VideoContainer>
        );
      }}
      keyExtractor={(item) => item.id}
      listKey={(item) => item.id}
      numColumns={2}
    />
  );
};
