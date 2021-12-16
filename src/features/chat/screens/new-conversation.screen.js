import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";

import { fetchUsersData } from "../../../services/redux/actions/post.actions";
import { useSelector, useDispatch } from "react-redux";

import {
  ListEmptyBackground,
  FollowingIcon,
  NewConversationBackground,
  FollowingListSection,
  UserRow,
} from "../styles/new-conversation.styles";

export const NewConversationScreen = ({ navigation }) => {
  const { following, users } = useSelector((state) => state.posts);

  const [followings, setFollowings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 0; i < following.length; i++) {
      if (following[i].hasOwnProperty("otherUser")) {
        continue;
      }

      let otherUserId = following[i].id;

      const user = users.find((x) => x.id === otherUserId);

      if (user === undefined) {
        dispatch(fetchUsersData(otherUserId));
      } else {
        following[i].otherUser = user;
      }
    }
    setFollowings(following);
  }, [following, users]);

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <FollowingIcon />
        <Text variant="list_empty_title">No Following</Text>
        <Text variant="list_empty_message">
          When you follow people, you will see them here
        </Text>
      </ListEmptyBackground>
    );
  };

  const listHeaderComponent = () => {
    return (
      users.length !== 0 && (
        <FollowingListSection>
          <Text variant="newconversation_label">Following</Text>
        </FollowingListSection>
      )
    );
  };

  const renderItem = ({ item: user }) => {
    return (
      <UserRow
        onPress={() =>
          navigation.navigate("Conversation", { user: user.otherUser })
        }
      >
        <Avatar
          rounded
          size="medium"
          source={{ uri: user.otherUser?.profilePhoto }}
          onPress={() => navigation.navigate("ViewProfile")}
        />
        <ListItem.Content>
          <Text variant="newconversation_name">
            {user.otherUser?.displayName}
          </Text>
        </ListItem.Content>
      </UserRow>
    );
  };

  return (
    <NewConversationBackground>
      <FlatList
        data={followings}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </NewConversationBackground>
  );
};
