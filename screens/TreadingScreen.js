import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const TreadingScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Treading Screen</Text>
      <Button
        title="View Posting"
        onPress={() => {
          props.navigation.navigate({ routeName: "ViewPosting" });
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

export default TreadingScreen;