import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const NewMessageScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>New Message Screen</Text>
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