import React from "react";
import { ListItem } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";

import {
  ListEmptyBackground,
  FollowersList,
  FollowButton,
  UserImage,
} from "../styles/followers-tab.styles";

export const FollowersTab = ({ route, navigation }) => {
  const { newitem } = route.params;

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Followers</Text>
        <Text variant="list_empty_message">
          Someone follows you that will appear here
        </Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => navigation.navigate("ViewProfile")}>
        <UserImage source={{ uri: item.profilePhoto }} />
        <ListItem.Content>
          <Text variant="followers_username">{item.username}</Text>
        </ListItem.Content>
        <FollowButton
          title={<Text variant="follow_textbutton">Follow</Text>}
          onPress={() => console.log("click unfollow")}
        />
      </ListItem>
    );
  };

  return (
    <FollowersList
      data={newitem}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      listKey={(item) => item.id}
    />
  );
};
