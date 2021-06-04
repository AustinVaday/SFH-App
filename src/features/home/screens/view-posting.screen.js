import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const ViewPostingScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>View Posting Screen</Text>
      <Button
        title="View Guest Profile"
        onPress={() => {
          navigation.navigate("ViewGuestProfile");
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
