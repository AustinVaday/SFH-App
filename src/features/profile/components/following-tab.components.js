import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, List } from "react-native-paper";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const FollowingList = styled(FlatList)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ListItem = styled(List.Item)`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

export const FollowingTab = ({ route, navigation }) => {
  const { newitem } = route.params;

  return (
    <FollowingList
      data={newitem.following}
      renderItem={({ item }) => {
        return (
          <ListItem
            onPress={() => navigation.navigate("ViewProfile")}
            title={<Text variant="follow_name">{item.name}</Text>}
            left={() => (
              <Avatar.Image size={50} source={{ uri: item.avatar }} />
            )}
            right={() => (
              <Button
                mode="outlined"
                style={{ alignSelf: "center" }}
                color={colors.bg.primary}
                labelStyle={{ color: colors.text.brand }}
                uppercase={false}
                onPress={() => {}}
              >
                <Text
                  variant="text_button"
                  style={{ color: colors.text.brand }}
                >
                  Following
                </Text>
              </Button>
            )}
          />
        );
      }}
      keyExtractor={(item) => item.id}
      listKey={(item) => item.id}
    />
  );
};
