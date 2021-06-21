import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const SettingsScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <View style={styles.screen}>
      <Text>Setting Screen</Text>
      <Button title="Sign out" onPress={onLogout} />
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