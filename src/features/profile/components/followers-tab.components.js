import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, TouchableRipple } from "react-native-paper";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

const FollowersButton = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const AvatarImageContainer = styled.View`
  padding-right: ${(props) => props.theme.space[3]};
`;

const FollowersList = styled(FlatList)`
  padding: ${(props) => props.theme.space[2]};
  background-color: #f8f9fa;
`;

const NameText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_700};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const FollowersTab = ({ route, navigation }) => {
  const { newitem } = route.params;

  return (
    <FollowersList
      data={newitem.followers}
      renderItem={({ item }) => {
        return (
          <TouchableRipple
            onPress={() => {
              navigation.navigate("ViewProfile");
            }}
          >
            <BottomCard>
              <AvatarImageContainer>
                <Avatar.Image size={50} source={{ uri: item.avatar }} />
              </AvatarImageContainer>
              <NameText>{item.name}</NameText>
              <FollowersButton>
                  {item.followed ? 
                <Button
                  mode="outlined"
                  color={colors.brand.primary}
                  style={{ width: 120}}
                  uppercase={false}
                  onPress={() => {}}
                >
                  Remove
                </Button> : <Button
                  mode="contained"
                  color={colors.brand.primary}
                  style={{ width: 120}}
                  uppercase={false}
                  onPress={() => {}}
                >
                  Follow
                </Button>}
              </FollowersButton>
            </BottomCard>
          </TouchableRipple>
        );
      }}
      keyExtractor={(item) => item.id}
      listKey={(item) => item.id}
    />
  );
};
