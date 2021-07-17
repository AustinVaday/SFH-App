import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import styled from "styled-components/native";

import { MessageCard } from "../components/message-card.components";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import dataMessages from "../../../utils/mock/dataMessages";

const MessagesBackground = styled.View`
  flex: 1;
  background-color: ${colors.bg.primary};
`;

const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
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

const { height } = Dimensions.get("window");

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
      <RowBack>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          activeOpacity={0.9}
          onPress={() => alertDeleteConversation(data, rowMap)}
        >
          <Text variant="body" style={{ color: colors.bg.primary }}>
            Delete
          </Text>
        </TouchableOpacity>
      </RowBack>
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

  return (
    <MessagesBackground>
      <SwipeListView
        data={listData}
        ListEmptyComponent={() => {
          return (
            <ListEmptySection style={{ height: height / 2 }}>
              <MCIcon
                name={"message-processing-outline"}
                size={100}
                color={colors.bg.tertiary}
              />
              <Text
                variant="empty_title"
                style={{
                  textAlign: "center",
                  paddingBottom: 20,
                  paddingTop: 20,
                }}
              >
                Message Your Friends
              </Text>
              <Text variant="empty_message" style={{ textAlign: "center" }}>
                Start a conversation
              </Text>
            </ListEmptySection>
          );
        }}
        renderItem={(data, rowMap) => {
          return (
            <MessageCard
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
    </MessagesBackground>
  );
};
