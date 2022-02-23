import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NotificationCard } from "../../components/notification-card.components";
import { Text } from "../../../../components/typography/text.components";

import { deleteNotification } from "../../../../services/firebase/notifications";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../../../services/redux/actions/notifications.actions";

import {
  SwipeDeleteButton,
  RowHiddenContainer,
  ActivityBackground,
  ListEmptyBackground,
  ListEmptyContainer,
  NotificationsEmptyImage,
  Loader,
  LoaderImage,
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
  const insets = useSafeAreaInsets();

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
        <ListEmptyContainer>
          <NotificationsEmptyImage
            source={require("../../../../assets/images/empty-notifications.png")}
          />
          <Text variant="list_empty_title">No Notifications</Text>
        </ListEmptyContainer>
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
        <Loader
          style={{
            paddingBottom: insets.bottom,
          }}
        >
          <LoaderImage source={require("../../../../assets/loading/loader.gif")} />
        </Loader>
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
        />
      )}
    </ActivityBackground>
  );
};
