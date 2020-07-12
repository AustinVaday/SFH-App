import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ViewGuestProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>View Guest Profile Screen</Text>
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

export default ViewGuestProfileScreen;
