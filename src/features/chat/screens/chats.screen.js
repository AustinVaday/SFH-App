import React, { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { ChatRow } from "../components/chat-row.components";
import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { LoadingIndicator } from "../../../components/loading/loading-indicator.components";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  fetchOtherUsers,
} from "../../../services/redux/actions/chats.actions";

import {
  ChatsBackground,
  RowHiddenContainer,
  SwipeDeleteButton,
} from "./styles/chats.styles";

export const ChatsScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { otherUsers, currentUserChats } = useSelector((state) => state.chats);

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats(setLoading));
  }, []);

  useEffect(() => {
    for (let i = 0; i < currentUserChats.length; i++) {
      if (currentUserChats[i].hasOwnProperty("otherUser")) {
        continue;
      }
      let otherUserId;

      if (currentUserChats[i].users[0] === currentUser.id) {
        otherUserId = currentUserChats[i].users[1];
      } else {
        otherUserId = currentUserChats[i].users[0];
      }

      const user = otherUsers.find((x) => x.id === otherUserId);
      if (user === undefined) {
        dispatch(fetchOtherUsers(otherUserId));
      } else {
        currentUserChats[i].otherUser = user;
      }
    }
    setConversations(currentUserChats);
  }, [currentUserChats, otherUsers]);

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
      <>
        <Text variant="list_empty_title">No Messages</Text>
        <Spacer size="large" />
        <Text variant="list_empty_message">Start a conversation</Text>
      </>
    );
  };

  const renderItem = (data, rowMap) => {
    return <ChatRow user={data.item} onDeleteRow={deleteRow} rowMap={rowMap} />;
  };

  return (
    <ChatsBackground>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <SwipeListView
          data={conversations}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe={true}
          disableLeftSwipe={Platform.OS === "android" ? true : false}
          rightOpenValue={-75}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            conversations.length === 0 && {
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }
          }
        />
      )}
    </ChatsBackground>
  );
};
