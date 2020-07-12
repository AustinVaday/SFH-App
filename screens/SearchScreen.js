import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const SearchScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Search Screen</Text>
      <Button
        title="List Search Results"
        onPress={() => {
          props.navigation.navigate({ routeName: "ListSearchResults" });
        }}
      />
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

export default SearchScreen;
