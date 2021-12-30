import React from "react";
import { Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { NotificationCard } from "../components/notification-card.components";
import { Text } from "../../../components/typography/text.components";

import { deleteNotification } from "../../../services/user";
import { useSelector } from "react-redux";

import {
  SwipeDeleteButton,
  RowHiddenContainer,
  ActivityBackground,
} from "../styles/activity.styles";

export const ActivityScreen = () => {
  const notifications = useSelector((state) => state.posts.notifications);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    deleteNotification(rowKey, currentUser.id);

    // KEEP THIS CODE LINES. I MIGHT NEED THIS
    // const newData = [...listData];
    // const prevIndex = listData.findIndex((item) => item.id === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <RowHiddenContainer>
        <SwipeDeleteButton onPress={() => deleteRow(rowMap, data.item.id)}>
          <Text variant="swipe_delete">Delete</Text>
        </SwipeDeleteButton>
      </RowHiddenContainer>
    );
  };

  const renderItem = (data, rowMap) => {
    return (
      <NotificationCard
        notification={data.item}
        onDeleteRow={deleteRow}
        rowMap={rowMap}
      />
    );
  };

  return (
    <ActivityBackground>
      <SwipeListView
        data={notifications}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe={true}
        disableLeftSwipe={Platform.OS === "android" ? true : false}
        rightOpenValue={-75}
        keyExtractor={(index) => index.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ActivityBackground>
  );
};
