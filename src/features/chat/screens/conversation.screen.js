import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ConversationScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Conversation Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});