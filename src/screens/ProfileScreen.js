import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
      <Button
        title="Setting"
        onPress={() => {
          props.navigation.navigate({ routeName: "Setting" });
        }}
      />
      <Button
        title="Edit Profile"
        onPress={() => {
          props.navigation.navigate({ routeName: "EditProfile" });
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

export default ProfileScreen;