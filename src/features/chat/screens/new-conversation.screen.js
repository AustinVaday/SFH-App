import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import { fetchOtherUsers } from "../../../services/redux/actions/chats.actions";
import { useSelector, useDispatch } from "react-redux";

import {
  FollowingIcon,
  NewConversationBackground,
  FollowingListSection,
  UserRow,
} from "./styles/new-conversation.styles";

export const NewConversationScreen = ({ navigation }) => {
  // const { otherUsers } = useSelector((state) => state.chats);
  const followings = useSelector(
    (state) => state.followings.currentUserFollowings
  );

  const [followingsState, setFollowingsState] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    // for (let i = 0; i < followings.length; i++) {
    //   if (followings[i].hasOwnProperty("otherUser")) {
    //     continue;
    //   }

    //   let otherUserId = followings[i].id;

    //   const user = otherUsers.find((x) => x.id === otherUserId);

    //   if (user === undefined) {
    //     dispatch(fetchOtherUsers(otherUserId));
    //   } else {
    //     followings[i].otherUser = user;
    //   }
    // }
    setFollowingsState(followings);
  }, [followings]);

  const listEmptyComponent = () => {
    return (
      <>
        <FollowingIcon />
        <Text variant="list_empty_title">No Following</Text>
        <Spacer size="large" />
        <Text variant="list_empty_message">
          When you follow people, you will see them here
        </Text>
      </>
    );
  };

  const listHeaderComponent = () => {
    return (
      followings.length !== 0 && (
        <FollowingListSection>
          <Text variant="newconversation_label">Following</Text>
        </FollowingListSection>
      )
    );
  };

  const renderItem = ({ item: user }) => {
    console.log(user);
    return (
      <UserRow onPress={() => navigation.navigate("Conversation", { user })}>
        <Avatar
          rounded
          size="medium"
          source={{ uri: user.profilePhoto }}
          onPress={() => navigation.navigate("ViewProfile")}
        />
        <ListItem.Content>
          <Text variant="newconversation_name">{user.username}</Text>
        </ListItem.Content>
      </UserRow>
    );
  };

  return (
    <NewConversationBackground>
      <FlatList
        data={followingsState}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          followingsState.length === 0 && {
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            bottom: 50,
          }
        }
      />
    </NewConversationBackground>
  );
};
