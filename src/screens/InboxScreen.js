import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const InboxScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Inbox Screen</Text>
      <Button
        title="View Guest Profile"
        onPress={() => {
          props.navigation.navigate({ routeName: "ViewGuestProfile" });
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

export default InboxScreen;
