import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CameraScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Camera Screen</Text>
      <Button
        title="Posting"
        onPress={() => {
          props.navigation.navigate({ routeName: "Posting" });
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

export default CameraScreen;
