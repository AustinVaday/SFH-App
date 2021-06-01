import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from 'firebase';

export const SettingScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Setting Screen</Text>
      <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
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