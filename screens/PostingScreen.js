import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const PostingScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Posting Screen</Text>
      <Button
        title="Finish posting"
        onPress={() => {
          props.navigation.pop();
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

export default PostingScreen;
