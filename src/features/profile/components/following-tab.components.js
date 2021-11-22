import React from "react";
import { ListItem } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";

import {
  ListEmptyBackground,
  FollowingList,
  FollowingButton,
  UserImage,
} from "../styles/following-tab.styles";

export const FollowingTab = ({ route, navigation }) => {
  const { newitem } = route.params;

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Following</Text>
        <Text variant="list_empty_message">
          Search and follow someone that will appear here
        </Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => navigation.navigate("ViewProfile")}>
        <UserImage source={{ uri: item.profilePhoto }} />
        <ListItem.Content>
          <Text variant="following_username">{item.username}</Text>
        </ListItem.Content>
        <FollowingButton
          title={<Text variant="following_textbutton">Following</Text>}
          onPress={() => console.log("click unfollow")}
        />
      </ListItem>
    );
  };

  return (
    <FollowingList
      data={newitem}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      listKey={(item) => item.id}
    />
  );
};
