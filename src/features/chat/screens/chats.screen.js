import React, { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { ChatRow } from "../components/chat-row.components";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../../services/redux/actions/post.actions";

import {
  ChatsBackground,
  ListEmptyBackground,
  RowHiddenContainer,
  NavBar,
  SwipeDeleteButton,
} from "../styles/chats.styles";

export const ChatsScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { users, chats } = useSelector((state) => state.posts);

  const [conversations, setConversations] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].hasOwnProperty("otherUser")) {
        continue;
      }
      let otherUserId;

      if (chats[i].users[0] === currentUser.id) {
        otherUserId = chats[i].users[1];
      } else {
        otherUserId = chats[i].users[0];
      }

      const user = users.find((x) => x.id === otherUserId);
      if (user === undefined) {
        dispatch(fetchUsersData(otherUserId));
      } else {
      chats[i].otherUser = user;
      }
    }
    setConversations(chats);
  }, [chats, users]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...conversations];
    const prevIndex = conversations.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setConversations(newData);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <RowHiddenContainer>
        <SwipeDeleteButton
          onPress={() => alertDeleteConversation(data, rowMap)}
        >
          <Text variant="swipe_delete">Delete</Text>
        </SwipeDeleteButton>
      </RowHiddenContainer>
    );
  };

  const alertDeleteConversation = (data, rowMap) => {
    closeRow(rowMap, data.item.id);
    Alert.alert(
      "Permanently delete this conversation?",
      "All the messages will be removed from this conversation.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteRow(rowMap, data.item.id),
        },
      ]
    );
  };

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">Message Your Friends</Text>
        <Text variant="list_empty_message">Start a conversation</Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = (data, rowMap) => {
    return <ChatRow user={data.item} onDeleteRow={deleteRow} rowMap={rowMap} />;
  };

  return (
    <ChatsBackground>
      <NavBar
        nav={navigation}
        centerComponent={<Text variant="navbar_title">Chats</Text>}
      />
      <SwipeListView
        data={conversations}
        ListEmptyComponent={listEmptyComponent}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe={true}
        disableLeftSwipe={Platform.OS === "android" ? true : false}
        rightOpenValue={-75}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ChatsBackground>
  );
};
