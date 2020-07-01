import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ListSearchResultsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>List Search Results Screen</Text>
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

export default ListSearchResultsScreen;
