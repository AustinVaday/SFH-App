import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { MessageCard } from "../components/message-card.components";
import { Text } from "../../../components/typography/text.components";

import dataMessages from "../../../utils/mock/dataMessages";

import {
  MessagesBackground,
  ListEmptyBackground,
  RowHiddenContainer,
  NavBar,
  SwipeDeleteButton,
} from "../styles/messages.styles";

export const MessagesScreen = ({ navigation }) => {
  const [listData, setListData] = useState(dataMessages);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
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
    return (
      <MessageCard
        user={data.item}
        onDeleteRow={deleteRow}
        rowMap={rowMap}
      />
    );
  };

  return (
    <MessagesBackground>
      <NavBar
        nav={navigation}
        centerComponent={<Text variant="navbar_title">Messages</Text>}
      />
      <SwipeListView
        data={listData}
        ListEmptyComponent={listEmptyComponent}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe={true}
        disableLeftSwipe={Platform.OS === "android" ? true : false}
        rightOpenValue={-75}
        keyExtractor={(index) => index.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </MessagesBackground>
  );
};
