import React, { useState } from "react";
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import styled from "styled-components/native";

import { NotificationCard } from "../components/notification-card.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import dataNotifications from "../../../utils/mock/dataNotifications";

const ActivityBackground = styled.View`
  flex: 1;
  background-color: ${colors.bg.primary};
`;

const RowBack = styled.View`
  flex: 1;
  background-color: ${colors.bg.secondary};
`;

const styles = StyleSheet.create({
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: colors.text.error,
    right: 0,
  },
});

export const ActivityScreen = ({ navigation }) => {
  const [listData, setListData] = useState(dataNotifications);

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
      <RowBack>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          activeOpacity={0.9}
          onPress={() => deleteRow(rowMap, data.item.id)}
        >
          <Text variant="body" style={{ color: colors.bg.primary }}>
            Delete
          </Text>
        </TouchableOpacity>
      </RowBack>
    );
  };

  return (
    <ActivityBackground>
      <SwipeListView
        data={listData}
        renderItem={(data, rowMap) => {
          return (
            <NotificationCard
              user={data.item}
              onNavigate={navigation.navigate}
              onDeleteRow={deleteRow}
              rowMap={rowMap}
            />
          );
        }}
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
