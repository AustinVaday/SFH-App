import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { NotificationCard } from "../../components/notification-card.components";
import { Text } from "../../../../components/typography/text.components";
import { LoadingIndicator } from "../../../../components/loading/loading-indicator.components";

import { deleteNotification } from "../../../../services/firebase/notifications";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../../../services/redux/actions/notifications.actions";

import {
  SwipeDeleteButton,
  RowHiddenContainer,
  ActivityBackground,
  ListEmptyBackground,
} from "./styles/activity.styles";

export const ActivityScreen = () => {
  const [loading, setLoading] = useState(true);

  const notifications = useSelector(
    (state) => state.notifications.currentUserNotifications
  );
  const fetched = useSelector(
    (state) => state.notifications.isCurrentUserNotificationsFetched
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchNotifications(setLoading));
    } else {
      setLoading(false);
    }
  }, []);

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

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Notifications</Text>
      </ListEmptyBackground>
    );
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
      {loading ? (
        <LoadingIndicator />
      ) : (
        <SwipeListView
          data={notifications}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          ListEmptyComponent={listEmptyComponent}
          disableRightSwipe={true}
          disableLeftSwipe={Platform.OS === "android" ? true : false}
          rightOpenValue={-75}
          keyExtractor={(index) => index.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </ActivityBackground>
  );
};
