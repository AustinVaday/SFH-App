import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.components";

import { MessageCard } from "../components/message-card.components";

import dataMessages from "../../../utils/mock/dataMessages";

export const MessagesScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      {/* <List.Section> */}
      <FlatList
        data={dataMessages}
        renderItem={({ item }) => {
          return (
              <MessageCard
                user={item}
                onNavigate={navigation.navigate}
              />
          );
        }}
        keyExtractor={(index) => index.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      {/* </List.Section> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // padding: 10,
    backgroundColor: "white",
    // alignItems: "center",
  },
});