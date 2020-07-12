import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title="View Posting"
        onPress={() => {
          props.navigation.navigate({ routeName: "ViewPosting" });
        }}
      />
      <Button
        title="View Guest Profile"
        onPress={() => {
          props.navigation.navigate({ routeName: "ViewGuestProfile" });
        }}
      />
      <Button
        title="Search"
        onPress={() => {
          props.navigation.navigate({ routeName: "Search" });
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

export default HomeScreen;
